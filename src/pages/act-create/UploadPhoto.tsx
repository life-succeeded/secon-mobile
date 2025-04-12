import { useDispatch } from 'react-redux'
import { nextFormStep } from '../../store/navigationSlice'
import { Button } from '../../components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react'
import Checkbox from '../../components/ui/checkbox'
import { useMultiCamera } from '../../lib/hooks/useMultiCamera'
import { Label } from '../../components/ui/label'

type FormData = {
    noAccess: boolean
}

function UploadPhoto() {
    const dispatch = useDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    const { takePicture, photos } = useMultiCamera();
    const [isNoAccess, setIsNoAccess] = useState(false);

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

    return (
        <div className="relative flex h-full flex-col px-5 pt-25">
            <div className="flex w-full flex-col gap-5">
                <FormProvider {...fm}>
                    <form
                        onSubmit={fm.handleSubmit(onSubmit)}
                        className="flex w-full flex-col gap-3"
                    >
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
                            </div>
                        </div>
                        <Checkbox
                            // {...fm.register('noAccess')}
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

                        <div className="absolute right-5 bottom-5 left-5">
                            <Button className="w-full" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Сохранение...' : 'Продолжить'}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default UploadPhoto
