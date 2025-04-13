import { useDispatch } from 'react-redux'
import { nextFormStep } from '../../store/navigationSlice'
import { Button } from '../../components/ui/button'
import { useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Checkbox } from '../../components/ui/checkbox'
import { PhotoData, useMultiCamera } from '../../lib/hooks/useMultiCamera'
import { Label } from '../../components/ui/label'
import { ImageCropper } from '../../components/core/cropper'
import { Input } from '../../components/ui/input'
import axios from 'axios'

function UploadPhoto() {
    const [photoType, setPhotoType] = useState('')
    const dispatch = useDispatch()
    const { takePicture, photos, setPhotos } = useMultiCamera()
    const [isNoAccess, setIsNoAccess] = useState(false)

    const { watch, setValue, getValues } = useFormContext();

    const addres = watch('address');
    const deviceNumber = watch('deviceValue');
    const noAccessCheck = watch('noAccess')
    const oldFile = watch('originalFile')

    useEffect(() => {
        const dataType = (oldFile as { type: string })?.type
        if (!dataType) return;
        setPhotos({
            [dataType]: oldFile
        });

        console.log('log', dataType, oldFile)
        console.log(photos)
    }, [oldFile])

    useEffect(() => {
        setIsNoAccess(noAccessCheck)
    }, [noAccessCheck])

    const handleNext = () => {
        dispatch(nextFormStep())
    }

    function base64ToBlob(base64, mimeType) {
        const byteCharacters = atob(base64.split(',')[1]);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);

            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: mimeType });
    }

    async function sendBase64File(base64String, fileName, mimeType) {
        // Преобразуем base64 в Blob
        const blob = base64ToBlob(base64String, mimeType);

        // Создаем FormData и добавляем файл
        const formData = new FormData();
        formData.append('file', blob, fileName || 'file');

        // Дополнительные данные, если нужно
        formData.append('address', addres);
        formData.append('device_number', deviceNumber);

        try {
            const response = await axios.post<{name: string}>('https://tns.quassbot.ru/api/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

            });

            const photo = photos[photoType]

            setPhotos({
                [photoType]: {
                    ...photo,
                    fileName: response.data.name
                }
            })

            const newPhoto = photos[photoType]

            setValue('originalFile', newPhoto)

            console.log('Файл успешно отправлен:', response.data);
            return response.data;
        } catch (error) {
            console.error('Ошибка при отправке файла:', error);
            throw error;
        }
    }

    const handleTakePicture = async (type: 'counter' | 'seal') => {
        try {
            await takePicture(type)
        } catch (error) {
            console.error('Ошибка при создании фото:', error)
        }
    }

    const onNext = () => {
        try {
            console.log(photos)
            if (!noAccessCheck && (!photos['counter'] && !photos['seal'])) {
                throw new Error(
                    'Пожалуйста, добавьте все необходимые фотографии или отметьте отсутствие доступа',
                )
            }

            const photo = photos[photoType]
            setValue('originalFile', photo)
            console.log('values', getValues())

            handleNext()
        } catch (error: any) {
            console.error('Ошибка при сохранении информации:', error)
        }
    }

    function base64ToFile(base64: string, filename: string): File {
        if (!base64) {
            throw new Error('Base64 string is empty');
        }

        const parts = base64.split(';base64,');
        const mimeType = parts.length > 1 ? parts[0].split(':')[1] : 'image/jpeg';
        const base64Data = parts.length > 1 ? parts[1] : base64;

        try {
            const byteString = atob(base64Data);
            const byteNumbers = new Array(byteString.length);
            for (let i = 0; i < byteString.length; i++) {
                byteNumbers[i] = byteString.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);

            return new File([byteArray], filename, { type: mimeType });
        } catch (e) {
            throw new Error('Failed to decode base64 string: ' + e.message);
        }
    }

    const renderCropper = (type: 'seal' | 'counter') => {
        if (!photos[type]) {
            return null;
        }
        const photo = photos[type];

        const file = base64ToFile(photo.data, photo.fileName);

        return (
            <ImageCropper file={file} onChange={(file: PhotoData) => {
                console.log('file', file)
                sendBase64File(file.data, file.fileName, 'image/jpeg')
                setValue('counterValue', file)
            }}
            />
        )
    }

    return (
        <div
            className="flex w-full h-full    flex-grow flex-col gap-3 p-5 pt-25 grid-rows-[auto_1fr_auto]"
        >
            <div className='flex-grow'>
                <div>Добавление фото счётчика до работы</div>
                <div className="flex w-full flex-col gap-6">
                    <div className="flex w-full flex-col gap-2">
                        <Input name={'counterNumberNew'} label='Заводской № прибора учета' />
                        <Button
                            type="button"
                            onClick={() => {
                                handleTakePicture('counter');
                                setPhotoType('counter')
                            }}
                            disabled={isNoAccess}
                        >
                            Добавить фото счётчика
                        </Button>
                        {!isNoAccess && photos['counter'] && (
                            <Label icon="image" text={photos['counter'].fileName} />
                        )}
                        {renderCropper('counter')}

                    </div>
                    <div className="flex w-full flex-col gap-2">
                        <Button
                            type="button"
                            onClick={() => {
                                handleTakePicture('seal');
                                setPhotoType('seal')
                            }}
                            disabled={isNoAccess}
                        >
                            Добавить фото пломбы
                        </Button>
                        {!isNoAccess && photos['seal'] && (
                            <Label icon="image" text={photos['seal'].fileName} />
                        )}
                        {renderCropper('seal')}
                    </div>
                </div>
                <Checkbox
                    className="py-2"
                    label="Нет доступа к счётчику"
                    name='noAccess'
                />
            </div>


            <div className="">
                <Button
                    className="w-full" type="button"
                    onClick={() => onNext()}
                >
                    Продолжить
                </Button>
            </div>
        </div>
    )
}

export default UploadPhoto
