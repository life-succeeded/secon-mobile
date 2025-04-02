import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonFab, IonFabButton, IonList, IonItem, IonLabel, IonBadge } from '@ionic/react';
import { add, sync, logOut } from 'ionicons/icons';
import { useGetActsQuery } from '../api/api';
import { useSync } from '../context/SyncContext';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useHistory } from 'react-router';

export const Home = () => {
  const { data: acts = [], isLoading } = useGetActsQuery();
  const { syncData, isSyncing, lastSync } = useSync();
  const history = useHistory();

  const recentActs = [...acts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <IonPage className="flex flex-col h-screen">
      <IonHeader className="ion-no-border">
        <IonToolbar className="toolbar-gradient">
          <IonTitle>Главная</IonTitle>
          <IonButtons slot="end">
            <IonButton 
              onClick={() => syncData()} 
              disabled={isSyncing}
              className="ion-activatable ion-focusable button-with-gradient"
            >
              <IonIcon icon={sync} className={isSyncing ? "animate-spin" : ""} slot="icon-only" />
            </IonButton>
            <IonButton 
              className="ion-activatable ion-focusable button-with-gradient"
            >
              <IonIcon icon={logOut} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding bg-gray-50">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Последние акты</h2>
          
          {lastSync && (
            <p className="text-sm text-gray-500">
              Последняя синхронизация: {format(new Date(lastSync), 'PPpp', { locale: ru })}
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-pulse text-gray-500">Загрузка...</div>
          </div>
        ) : recentActs.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Нет созданных актов
          </div>
        ) : (
          <IonList className="bg-white rounded-lg shadow ion-no-margin">
            {recentActs.map((act) => (
              <IonItem 
                key={act.id} 
                button 
                detail={false}
                onClick={() => history.push(`/acts/${act.id}`)}
                className="ion-no-padding border-b border-gray-100 last:border-b-0"
              >
                <IonLabel className="py-3">
                  <h2 className="font-medium text-gray-800">{act.actNumber}</h2>
                  <p className="text-sm text-gray-600">{act.consumer.fullName}</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(act.createdAt), 'PPpp', { locale: ru })}
                  </p>
                </IonLabel>
                <IonBadge 
                  slot="end" 
                  color={act.isSynced ? "success" : "warning"}
                  className="text-white"
                >
                  {act.isSynced ? 'Синхр.' : 'Лок.'}
                </IonBadge>
              </IonItem>
            ))}
          </IonList>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed" className="mb-4">
          <IonFabButton 
            onClick={() => history.replace('/create-act')}
            className="fab-gradient"
          >
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};