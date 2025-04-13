import { useDispatch } from 'react-redux'
import { nextFormStep } from '../../store/navigationSlice'
import { Button } from '../../components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react'
import Checkbox from '../../components/ui/checkbox'
import { useMultiCamera } from '../../lib/hooks/useMultiCamera'
import { Label } from '../../components/ui/label'
import { ImageCropper } from '../../components/core/cropper'

type FormData = {
    noAccess: boolean
}

function UploadPhoto() {
    const dispatch = useDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    const { takePicture, photos } = useMultiCamera()
    const [isNoAccess, setIsNoAccess] = useState(false)

    const handleNext = () => {
        dispatch(nextFormStep())
    }

    const fm = useForm<FormData>({
        defaultValues: {
            noAccess: false,
        },
    })

    const handleTakePicture = async (type: 'counter' | 'seal') => {
        try {
            await takePicture(type)
        } catch (error) {
            console.error('Ошибка при создании фото:', error)
            setSubmitError('Не удалось сделать фото. Пожалуйста, попробуйте еще раз.')
        }
    }

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true)
        setSubmitError(null)

        try {
            // Проверяем, что либо есть фото, либо отмечено "Нет доступа"
            if (!data.noAccess && (!photos['counter'] || !photos['seal'])) {
                throw new Error(
                    'Пожалуйста, добавьте все необходимые фотографии или отметьте отсутствие доступа',
                )
            }

            // Сохраняем в sessionStorage
            if (!data.noAccess) {
                sessionStorage.setItem('counterPhoto', JSON.stringify(photos.counter))
                sessionStorage.setItem('sealPhoto', JSON.stringify(photos.seal))
            }
            sessionStorage.setItem('noAccess', data.noAccess.toString())

            handleNext()
        } catch (error: any) {
            console.error('Ошибка при сохранении информации:', error)
            setSubmitError(error.message || 'Произошла ошибка. Пожалуйста, попробуйте еще раз.')
        } finally {
            setIsSubmitting(false)
        }
    }

    function base64ToFile(base64: string, filename: string): File {
        // Проверяем, что строка не пустая
        if (!base64) {
            throw new Error('Base64 string is empty');
        }

        // Разделяем строку на части
        const parts = base64.split(';base64,');

        // Получаем MIME-тип (если есть)
        const mimeType = parts.length > 1 ? parts[0].split(':')[1] : 'image/jpeg';

        // Получаем чистую base64 строку (без префикса)
        const base64Data = parts.length > 1 ? parts[1] : base64;

        try {
            // Декодируем base64
            const byteString = atob(base64Data);

            // Создаем ArrayBuffer
            const byteNumbers = new Array(byteString.length);
            for (let i = 0; i < byteString.length; i++) {
                byteNumbers[i] = byteString.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);

            // Создаем и возвращаем File объект
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
        // <div className="flex w-full flex-col gap-5">
        <FormProvider {...fm}>
            <form
                onSubmit={fm.handleSubmit(onSubmit)}
                className="flex w-full h-full    flex-grow flex-col gap-3 p-5 pt-25 grid-rows-[auto_1fr_auto]"
            >
                <div className='flex-grow'>
                    {submitError && <div className="text-sm text-red-500">{submitError}</div>}

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
                        {...fm.register('noAccess')}
                        onChange={(e) => {
                            const checked = e.target.checked
                            setIsNoAccess(checked)
                            fm.setValue('noAccess', checked)
                            if (checked) {
                                sessionStorage.removeItem('counterPhoto')
                                sessionStorage.removeItem('sealPhoto')
                            }
                        }}
                        className="py-2"
                        label="Нет доступа к счётчику"
                    />
                </div>


                <div className="">
                    <Button className="w-full" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Сохранение...' : 'Продолжить'}
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}

export default UploadPhoto
