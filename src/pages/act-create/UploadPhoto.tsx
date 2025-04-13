import { useDispatch } from 'react-redux'
import { nextFormStep } from '../../store/navigationSlice'
import { Button } from '../../components/ui/button'
import { useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Checkbox } from '../../components/ui/checkbox'
import { useMultiCamera } from '../../lib/hooks/useMultiCamera'
import { Label } from '../../components/ui/label'
import { ImageCropper } from '../../components/core/cropper'

function UploadPhoto() {
    const dispatch = useDispatch()
    const { takePicture, photos } = useMultiCamera()
    const [isNoAccess, setIsNoAccess] = useState(false)

    const { watch } = useFormContext();

    const noAccessCheck = watch('noAccess')

    useEffect(() => {
        setIsNoAccess(noAccessCheck)
    }, [noAccessCheck])

    const handleNext = () => {
        dispatch(nextFormStep())
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
            if (!noAccessCheck && (!photos['counter'] || !photos['seal'])) {
                throw new Error(
                    'Пожалуйста, добавьте все необходимые фотографии или отметьте отсутствие доступа',
                )
            }

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

        console.log(photo)
        const file = base64ToFile(photo.data, photo.fileName);

        return (
            <ImageCropper file={file} onChange={() => { }} />
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
                        <Button
                            type="button"
                            onClick={() => handleTakePicture('counter')}
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
                            onClick={() => handleTakePicture('seal')}
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
