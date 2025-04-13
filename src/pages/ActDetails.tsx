import { useParams } from 'react-router'
import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import InteractiveMap from '../components/core/map'
import LocateControl from '../components/core/LocateControl'
import { FormProvider, useForm } from 'react-hook-form'

export const ActDetails = () => {
    const { id } = useParams<{ id: string }>()
    const [isLocating, setIsLocating] = useState(false)
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null)

    const fm = useForm();

    const handleLocate = () => {
        if (!navigator.geolocation) {
            alert('Геолокация не поддерживается вашим браузером')
            return
        }

        setIsLocating(true)

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation([position.coords.latitude, position.coords.longitude])
                setIsLocating(false)
            },
            (error) => {
                alert('Не удалось определить местоположение')
                console.error(error)
                setIsLocating(false)
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            },
        )
    }

    return (
        <div className="flex h-full flex-col">
            <div className="relative h-[50vh] w-full">
                <InteractiveMap
                    enableRouting={true}
                    userLocation={userLocation}
                    className="h-full w-full rounded-md"
                />

                <div className="absolute right-4 bottom-4 z-[1001]">
                    <LocateControl onClick={handleLocate} isLocating={isLocating} />
                </div>
            </div>

            <FormProvider {...fm}>
                <form className="border-t border-gray-200 p-5">
                    <div className="m-5 flex flex-col gap-3">
                        <p className="text-14-20-regular select-none">ул. Пушкина, д. 1, кв. 1</p>
                        <Input label="Время визита" name='timeToVizit' />
                        <Label text={'Пресняков Артём Дмитриевич'} icon="user" />
                        <Label
                            text={'8 800 555 35 35'}
                            className="underline-black-1 underline underline-offset-2"
                            icon="phone"
                        />
                        <Label text={'70ББ000584'} icon="idCard" />
                        <Label text={'Причина: плохой очень человек'} icon="fileBlank" />
                    </div>
                    <Button className="w-full" type='submit'>Составить акт</Button>
                </form>
            </FormProvider>

        </div>
    )
}
