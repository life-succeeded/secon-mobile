import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { 
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonRadioGroup,
  IonRadio,
  IonLabel,
  IonItem,
  IonInput,
  IonTextarea,
  IonDatetime,
  IonText,
  IonIcon,
  IonThumbnail,
  IonAlert,
  IonModal,
  IonDatetimeButton,
  IonPopover
} from '@ionic/react';
import { camera, save, close, calendar, time } from 'ionicons/icons';
import { useCreateActMutation } from '../api/api';
import { usePhotoService } from '../context/PhotoServiceContext';

export const ActCreatePage = () => {
  const [actType, setActType] = useState<'limitation' | 'restoration'>('limitation');
  const [showPhotoAlert, setShowPhotoAlert] = useState(false);
  
  const { control, handleSubmit, register, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      actNumber: '',
      date: new Date().toISOString(),
      time: new Date().toTimeString().substring(0, 5),
      consumer: {
        fullName: '',
        address: '',
        accountNumber: ''
      },
      meter: {
        number: '',
        type: ''
      },
      reason: '',
      method: ''
    }
  });

  const dateValue = watch('date');
  const timeValue = watch('time');

  const [createAct] = useCreateActMutation();
  const { photos, takePhoto, deletePhoto } = usePhotoService();
  const history = useHistory();

  const onSubmit = async (data: any) => {
    try {
      const actData = {
        ...data,
        type: actType,
        photos: photos.map(p => p.filepath),
        isSynced: false
      };
      await createAct(actData).unwrap();
      history.push('/');
    } catch (error) {
      console.error('Error creating act:', error);
    }
  };

  const handleTakePhoto = async () => {
    const meterNumber = control._formValues.meter?.number;
    if (!meterNumber) {
      setShowPhotoAlert(true);
      return;
    }
    await takePhoto(meterNumber);
  };

  const handleDeletePhoto = async () => {
    if (photos.length > 0) {
      try {
        await deletePhoto(photos[0]);
      } catch (error) {
        console.error('Error deleting photo:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5); // Возвращаем только часы и минуты
  };

  return (
    <IonPage className="flex flex-col h-screen">
      <IonHeader className="ion-no-border">
        <IonToolbar className="toolbar-gradient">
          <IonButtons slot="start">
            <IonBackButton className="text-white" defaultHref="/" />
          </IonButtons>
          <IonTitle className="text-white">Создание акта</IonTitle>
          <IonButtons slot="end">
            <IonButton 
              onClick={handleSubmit(onSubmit)}
              className="text-white"
            >
              <IonIcon icon={save} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding bg-gray-50">
        <div className="bg-white rounded-lg shadow mb-4 p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Тип акта</h2>
          <IonRadioGroup 
            value={actType} 
            onIonChange={e => setActType(e.detail.value)}
            className="space-y-2"
          >
            <IonItem className="ion-no-padding">
              <IonLabel>Ограничение подачи электроэнергии</IonLabel>
              <IonRadio slot="start" value="limitation" />
            </IonItem>
            <IonItem className="ion-no-padding">
              <IonLabel>Возобновление подачи электроэнергии</IonLabel>
              <IonRadio slot="start" value="restoration" />
            </IonItem>
          </IonRadioGroup>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Основные данные */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Основные данные</h2>
            <IonItem className="ion-no-padding mb-4" lines="none">
              <IonLabel position="stacked" className="text-gray-600 font-medium">Номер акта*</IonLabel>
              <IonInput
                className="mt-1 input-field"
                fill="outline"
                {...register('actNumber', { required: 'Обязательное поле' })}
              />
              {errors.actNumber && <IonText color="danger" className="text-sm mt-1 block">{errors.actNumber.message}</IonText>}
            </IonItem>

            <div className="grid grid-cols-2 gap-4">
              <IonItem className="ion-no-padding" lines="none">
                <IonLabel position="stacked" className="text-gray-600 font-medium">Дата*</IonLabel>
                <div className="mt-1">
                  <IonDatetimeButton datetime="datetime" className="date-picker-button"></IonDatetimeButton>
                  <IonPopover keepContentsMounted={true}>
                    <IonDatetime 
                      id="datetime"
                      presentation="date"
                      locale="ru-RU"
                      value={dateValue}
                      onIonChange={e => setValue('date', e.detail.value as string)}
                      className="custom-datetime"
                    >
                      <div slot="title" className="text-lg font-semibold text-gray-800 px-4 py-3">
                        Выберите дату
                      </div>
                    </IonDatetime>
                  </IonPopover>
                </div>
              </IonItem>

              <IonItem className="ion-no-padding" lines="none">
                <IonLabel position="stacked" className="text-gray-600 font-medium">Время*</IonLabel>
                <div className="mt-1">
                  <IonDatetimeButton datetime="time" className="time-picker-button"></IonDatetimeButton>
                  <IonPopover keepContentsMounted={true}>
                    <IonDatetime 
                      id="time"
                      presentation="time"
                      locale="ru-RU"
                      value={timeValue}
                      onIonChange={e => {
  const value = e.detail.value;
  if (typeof value === 'string') {
    setValue('time', value.substring(11, 16));
  } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') {
    setValue('time', value[0].substring(11, 16));
  } else {
    setValue('time', '');
  }
}}
                      className="custom-datetime"
                    >
                      <div slot="title" className="text-lg font-semibold text-gray-800 px-4 py-3">
                        Выберите время
                      </div>
                    </IonDatetime>
                  </IonPopover>
                </div>
              </IonItem>
            </div>
          </div>

          {/* Остальные части формы остаются без изменений */}
          {/* Данные потребителя */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Данные потребителя</h2>
            <IonItem className="ion-no-padding mb-4" lines="none">
              <IonLabel position="stacked" className="text-gray-600 font-medium">ФИО*</IonLabel>
              <IonInput
                className="mt-1 input-field"
                fill="outline"
                {...register('consumer.fullName', { required: 'Обязательное поле' })}
              />
              {errors.consumer?.fullName && <IonText color="danger" className="text-sm mt-1 block">{errors.consumer.fullName.message}</IonText>}
            </IonItem>

            <IonItem className="ion-no-padding mb-4" lines="none">
              <IonLabel position="stacked" className="text-gray-600 font-medium">Адрес*</IonLabel>
              <IonInput
                className="mt-1 input-field"
                fill="outline"
                {...register('consumer.address', { required: 'Обязательное поле' })}
              />
              {errors.consumer?.address && <IonText color="danger" className="text-sm mt-1 block">{errors.consumer.address.message}</IonText>}
            </IonItem>

            <IonItem className="ion-no-padding" lines="none">
              <IonLabel position="stacked" className="text-gray-600 font-medium">Лицевой счет</IonLabel>
              <IonInput
                className="mt-1 input-field"
                fill="outline"
                {...register('consumer.accountNumber')}
              />
            </IonItem>
          </div>

          {/* Данные прибора учета */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Данные прибора учета</h2>
            <IonItem className="ion-no-padding mb-4" lines="none">
              <IonLabel position="stacked" className="text-gray-600 font-medium">Номер счетчика*</IonLabel>
              <IonInput
                className="mt-1 input-field"
                fill="outline"
                {...register('meter.number', { required: 'Обязательное поле' })}
              />
              {errors.meter?.number && <IonText color="danger" className="text-sm mt-1 block">{errors.meter.number.message}</IonText>}
            </IonItem>

            <IonItem className="ion-no-padding mb-4" lines="none">
              <IonLabel position="stacked" className="text-gray-600 font-medium">Тип счетчика</IonLabel>
              <IonInput
                className="mt-1 input-field"
                fill="outline"
                {...register('meter.type')}
              />
            </IonItem>

            {photos.length > 0 ? (
              <div className="mt-4">
                <h3 className="text-md font-medium text-gray-700 mb-2">Фотография счетчика</h3>
                <div className="relative bg-gray-100 rounded-lg p-2">
                  <IonThumbnail className="w-full h-48 mx-auto">
                    <img 
                      src={photos[0].webviewPath} 
                      alt="Фотография счетчика"
                      className="object-contain w-full h-full rounded-lg"
                    />
                  </IonThumbnail>
                  <IonButton 
                    fill="clear" 
                    className="absolute top-2 right-2 p-1 m-0 bg-white rounded-full shadow"
                    onClick={handleDeletePhoto}
                  >
                    <IonIcon icon={close} color="danger" size="small" />
                  </IonButton>
                </div>
              </div>
            ) : (
              <IonButton
                expand="block"
                onClick={handleTakePhoto}
                className="mt-4"
                fill="outline"
              >
                <IonIcon icon={camera} slot="start" />
                Сфотографировать счетчик
              </IonButton>
            )}
          </div>

          {/* Причина и способ */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {actType === 'limitation' ? 'Данные ограничения' : 'Данные возобновления'}
            </h2>
            <IonItem className="ion-no-padding mb-4" lines="none">
              <IonLabel position="stacked" className="text-gray-600 font-medium">
                {actType === 'limitation' ? 'Причина ограничения*' : 'Причина возобновления*'}
              </IonLabel>
              <IonTextarea
                className="mt-1 input-field"
                fill="outline"
                {...register('reason', { required: 'Обязательное поле' })}
                rows={3}
              />
              {errors.reason && <IonText color="danger" className="text-sm mt-1 block">{errors.reason.message}</IonText>}
            </IonItem>

            <IonItem className="ion-no-padding" lines="none">
              <IonLabel position="stacked" className="text-gray-600 font-medium">
                {actType === 'limitation' ? 'Способ отключения*' : 'Способ подключения*'}
              </IonLabel>
              <IonTextarea
                className="mt-1 input-field"
                fill="outline"
                {...register('method', { required: 'Обязательное поле' })}
                rows={3}
              />
              {errors.method && <IonText color="danger" className="text-sm mt-1 block">{errors.method.message}</IonText>}
            </IonItem>
          </div>

          <IonButton
            type="submit"
            expand="block"
            className="mt-6"
            strong
          >
            Сохранить акт
          </IonButton>
        </form>

        <IonAlert
          isOpen={showPhotoAlert}
          onDidDismiss={() => setShowPhotoAlert(false)}
          header="Внимание"
          message="Пожалуйста, сначала укажите номер прибора учета"
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};