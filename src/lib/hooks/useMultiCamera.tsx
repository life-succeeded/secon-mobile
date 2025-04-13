import { useState } from 'react'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'

export interface PhotoData {
    fileName: string
    data: string | null // base64
    type?: string
}

export const useMultiCamera = () => {
    const [photos, setPhotos] = useState<Record<string, PhotoData | null>>({})
    const [error, setError] = useState<string | null>(null)

    const takePicture = async (key: string, options = {}) => {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Base64,
                source: CameraSource.Camera,
                ...options,
            })

            if (!image.base64String) {
                throw new Error('Не удалось получить фото')
            }

            let fileName = null
            if (image.path) {
                fileName = image.path.split('/').pop() || null
            } else {
                fileName = `photo_${Date.now()}.jpg`
            }

            setPhotos((prev) => ({
                ...prev,
                [key]: { data: image.base64String, fileName },
            }))

            setError(null)
            return { data: image.base64String, fileName }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Ошибка камеры'
            setError(message)
            return null
        }
    }

    const pickFromGallery = async (key: string, options = {}) => {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.Uri,
                source: CameraSource.Photos,
                ...options,
            })

            if (!image.webPath) {
                throw new Error('Не удалось выбрать фото')
            }

            let fileName = null
            if (image.path) {
                fileName = image.path.split('/').pop() || null
            } else {
                fileName = `gallery_${Date.now()}.jpg`
            }

            setPhotos((prev) => ({
                ...prev,
                [key]: { data: image.base64String, fileName },
            }))

            setError(null)
            return { url: image.webPath, fileName }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Ошибка выбора фото'
            setError(message)
            return null
        }
    }

    const resetPhoto = (key: string) => {
        setPhotos((prev) => ({ ...prev, [key]: null }))
    }

    const resetAll = () => {
        setPhotos({})
    }

    return {
        photos,
        error,
        setPhotos,
        takePicture,
        pickFromGallery,
        resetPhoto,
        resetAll,
        hasError: !!error,
    }
}
