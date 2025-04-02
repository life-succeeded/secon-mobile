import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonText, IonList, IonItem, IonLabel, IonBadge, IonImg } from '@ionic/react';
import { useParams } from 'react-router';
import { print, share, download } from 'ionicons/icons';
import { useGetActByIdQuery } from '../api/api';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

type Witness = {
  name: string;
  passport: string;
  phone: string;
};

type ActDetailsProps = {
  id: string;
  actNumber: string;
  type: 'limitation' | 'restoration';
  isSynced: boolean;
  createdAt: string;
  date: string;
  time: string;
  consumer: {
    fullName: string;
    address: string;
    accountNumber: string;
  };
  reason: string;
  method: string;
  sealNumbers: string[];
  witnesses: Witness[] | string[];
  representativeSignature?: string;
  consumerSignature?: string;
  photos: string[];
};

export const ActDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: act, isLoading } = useGetActByIdQuery(id);

  if (isLoading || !act) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>Загрузка...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="flex justify-center items-center h-full">
            <IonText color="medium">Загрузка данных акта...</IonText>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const typedAct = act as ActDetailsProps;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Акт {typedAct.actNumber}</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={print} slot="icon-only" />
            </IonButton>
            <IonButton>
              <IonIcon icon={share} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">
                Акт {typedAct.type === 'limitation' ? 'ограничения' : 'возобновления'} №{typedAct.actNumber}
              </h2>
              <IonBadge color={typedAct.isSynced ? 'success' : 'warning'}>
                {typedAct.isSynced ? 'Синхронизирован' : 'Локальный'}
              </IonBadge>
            </div>
            <IonText color="medium" className="text-sm">
              {format(new Date(typedAct.createdAt), 'PPpp', { locale: ru })}
            </IonText>
          </div>

          <IonList className="divide-y divide-gray-200">
            <IonItem>
              <IonLabel>
                <h3 className="text-sm font-medium text-gray-500">Потребитель</h3>
                <p>{typedAct.consumer.fullName}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h3 className="text-sm font-medium text-gray-500">Адрес</h3>
                <p>{typedAct.consumer.address}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h3 className="text-sm font-medium text-gray-500">Лицевой счет</h3>
                <p>{typedAct.consumer.accountNumber}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h3 className="text-sm font-medium text-gray-500">Дата и время</h3>
                <p>
                  {format(new Date(`${typedAct.date}T${typedAct.time}`), 'PPpp', { locale: ru })}
                </p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h3 className="text-sm font-medium text-gray-500">Причина</h3>
                <p>{typedAct.reason}</p>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h3 className="text-sm font-medium text-gray-500">Способ {typedAct.type === 'limitation' ? 'отключения' : 'подключения'}</h3>
                <p>{typedAct.method}</p>
              </IonLabel>
            </IonItem>

            {typedAct.type === 'limitation' && (
              <>
                {typedAct.sealNumbers.length > 0 && (
                  <IonItem>
                    <IonLabel>
                      <h3 className="text-sm font-medium text-gray-500">Номера пломб</h3>
                      <p>{typedAct.sealNumbers.join(', ')}</p>
                    </IonLabel>
                  </IonItem>
                )}

                {typedAct.witnesses.length > 0 && (
                  <IonItem>
                    <IonLabel>
                      <h3 className="text-sm font-medium text-gray-500">Свидетели</h3>
                      {typedAct.witnesses.map((witness, index) => {
                        if (typeof witness === 'string') {
                          return (
                            <div key={index} className="mt-2">
                              <p className="font-medium">{witness}</p>
                            </div>
                          );
                        }
                        return (
                          <div key={index} className="mt-2">
                            <p className="font-medium">{witness.name}</p>
                            <p className="text-sm text-gray-500">{witness.passport}</p>
                            <p className="text-sm text-gray-500">{witness.phone}</p>
                          </div>
                        );
                      })}
                    </IonLabel>
                  </IonItem>
                )}
              </>
            )}

            <IonItem>
              <IonLabel>
                <h3 className="text-sm font-medium text-gray-500">Подпись представителя</h3>
                {typedAct.representativeSignature && (
                  <IonImg 
                    src={typedAct.representativeSignature} 
                    className="h-20 w-auto border border-gray-200 rounded-md mt-2"
                  />
                )}
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <h3 className="text-sm font-medium text-gray-500">Подпись потребителя</h3>
                {typedAct.consumerSignature ? (
                  <IonImg 
                    src={typedAct.consumerSignature} 
                    className="h-20 w-auto border border-gray-200 rounded-md mt-2"
                  />
                ) : (
                  <IonText color="medium" className="text-sm">Отсутствует</IonText>
                )}
              </IonLabel>
            </IonItem>

            {typedAct.photos.length > 0 && (
              <IonItem>
                <IonLabel>
                  <h3 className="text-sm font-medium text-gray-500">Фотографии прибора учета</h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {typedAct.photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <IonImg 
                          src={`file://${photo}`}
                          className="h-24 w-full object-cover rounded-md border border-gray-200"
                        />
                        <IonButton 
                          fill="clear" 
                          size="small" 
                          className="absolute top-1 right-1 p-1 bg-white rounded-full shadow"
                          onClick={() => {/* TODO: Implement photo viewer */}}
                        >
                          <IonIcon icon={download} size="small" />
                        </IonButton>
                      </div>
                    ))}
                  </div>
                </IonLabel>
              </IonItem>
            )}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};