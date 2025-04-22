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
import toast from 'react-hot-toast'
import { base64ToFile } from '../../utils/strings'

function UploadPhoto() {
    const [photoType, setPhotoType] = useState('')
    const dispatch = useDispatch()
    const { takePicture, photos, setPhotos } = useMultiCamera()
    const [isNoAccess, setIsNoAccess] = useState(false)

    const { watch, setValue, getValues } = useFormContext()

    const noAccessCheck = watch('noAccess')
    const oldFile = watch('originalFile')

    useEffect(() => {
        const dataType = (oldFile as { type: string })?.type
        if (!dataType) return
        setPhotos({
            [dataType]: oldFile,
        })

        console.log('log', dataType, oldFile)
        console.log(photos)
    }, [oldFile])

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
            if (!noAccessCheck && !photos['counter'] && !photos['seal']) {
                toast.error(
                    'Пожалуйста, добавьте все необходимые фотографии или отметьте отсутствие доступа',
                )
                return
            }

            const photo = photos[photoType]
            setValue('originalFile', photo)
            console.log('values', getValues())

            handleNext()
        } catch (error: any) {
            console.error('Ошибка при сохранении информации:', error)
        }
    }

    // const renderCropper = (type: 'seal' | 'counter') => {
    //     if (!photos[type]) {
    //         return null
    //     }
    //     const photo = photos[type]

    //     const file = base64ToFile(photo.data, photo.fileName)

    //     return (
    //         <ImageCropper
    //             file={file}
    //             onChange={(file: PhotoData) => {
    //                 console.log('file', file)
    //                 setValue(type + 'Value', file)
    //             }}
    //         />
    //     )
    // }

    return (
        <div className="flex h-full w-full flex-grow grid-rows-[auto_1fr_auto] flex-col gap-3 p-5 pt-25">
            <div className="flex-grow">
                <div>Добавление фото счётчика до работы</div>
                <div className="flex w-full flex-col gap-6">
                    <div className="flex w-full flex-col gap-2">
                        <Input name={'counterNumberNew'} label="Заводской № прибора учета" />
                        <Button
                            type="button"
                            onClick={() => {
                                handleTakePicture('counter')
                            }}
                            disabled={isNoAccess}
                        >
                            Добавить фото счётчика
                        </Button>
                        {!isNoAccess && photos['counter'] && (
                            <Label icon="image" text={photos['counter'].fileName} />
                        )}
                        {/* {renderCropper('counter')} */}
                    </div>
                    <div className="flex w-full flex-col gap-2">
                        <Button
                            type="button"
                            onClick={() => {
                                handleTakePicture('seal')
                            }}
                            disabled={isNoAccess}
                        >
                            Добавить фото пломбы
                        </Button>
                        {!isNoAccess && photos['seal'] && (
                            <Label icon="image" text={photos['seal'].fileName} />
                        )}
                        {/* {renderCropper('seal')} */}
                    </div>
                </div>
                <Checkbox className="py-2" label="Нет доступа к счётчику" name="noAccess" />
            </div>

            <div className="">
                <Button className="w-full" type="button" onClick={() => onNext()}>
                    Продолжить
                </Button>
            </div>
        </div>
    )
}

export default UploadPhoto
