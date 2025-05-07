import { useDispatch } from 'react-redux'
import { nextFormStep } from '../../store/navigationSlice'
import { Button } from '../../components/ui/button'
import { useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Checkbox } from '../../components/ui/checkbox'
import { useMultiCamera } from '../../lib/hooks/useMultiCamera'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import axios from 'axios'
import toast from 'react-hot-toast'

function UploadPhoto() {
    const [photoType, setPhotoType] = useState('')
    const dispatch = useDispatch()
    const { takePicture, photos, setPhotos } = useMultiCamera()
    const [isNoAccess, setIsNoAccess] = useState(false)

    const { watch, setValue, getValues } = useFormContext()

    const address = watch('address')
    const deviceNumber = watch('counterNumberNew')
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

    function base64ToBlob(base64: string, mimeType: string) {
        const byteCharacters = atob(base64.split(',')[1])
        const byteArrays = []

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512)
            const byteNumbers = new Array(slice.length)

            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i)
            }

            const byteArray = new Uint8Array(byteNumbers)
            byteArrays.push(byteArray)
        }

        return new Blob(byteArrays, { type: mimeType })
    }

    async function sendBase64File(
        base64String: string,
        fileName: string,
        type: 'seal' | 'counter',
        mimeType: 'image/jpeg' = 'image/jpeg',
    ) {
        const blob = base64ToBlob(base64String, mimeType)
        const formData = new FormData()
        formData.append('file', blob, fileName || 'file')
        formData.append('address', address)
        formData.append('device_number', deviceNumber)

        try {
            const response = await axios.post<{ name: string; url: string }>(
                'https://tns.quassbot.ru/api/images',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )

            const photo = photos[type]

            setPhotos({
                [type]: {
                    ...photo,
                    fileName: response.data.name,
                },
            })

            const newPhoto = photos[photoType]

            setValue(type + 'Image', newPhoto)

            console.log('Файл успешно отправлен:', response.data)
            return response.data
        } catch (error) {
            console.error('Ошибка при отправке файла:', error)
            throw error
        }
    }

    const handleTakePicture = async (type: 'counter' | 'seal') => {
        try {
            const file = await takePicture(type)

            await sendBase64File(file.data, file.fileName, type)
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

    return (
        <div className="flex h-full w-full flex-grow grid-rows-[auto_1fr_auto] flex-col gap-3 p-5 pt-25">
            <div className="flex-grow">
                <div>Добавление фото счётчика до работы</div>
                <div className="flex w-full flex-col gap-6">
                    <div className="flex w-full flex-col gap-2">
                        <Input name={'number'} label="Заводской № прибора учета" />
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
