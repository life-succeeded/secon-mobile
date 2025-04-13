// useSafeArea.ts
import { useEffect, useState } from 'react'
import { Device, DeviceInfo } from '@capacitor/device'

export const useSafeArea = () => {
    const [safeArea, setSafeArea] = useState(0)
    const [A, S] = useState<DeviceInfo>()

    useEffect(() => {
        const getSafeArea = async () => {
            const info = await Device.getInfo()
            S(info)
            if (info.operatingSystem === 'ios') {
                // Для iOS можно использовать фиксированное значение (34px для iPhone X+)
                setSafeArea(34)
            } else if (info.operatingSystem === 'android') {
                // На некоторых Android-телефонах тоже есть "чёлка"
                setSafeArea(24)
            }
        }
        getSafeArea()
    }, [])

    return { safeArea, A } 
}