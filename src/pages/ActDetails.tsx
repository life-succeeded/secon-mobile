import { useParams } from 'react-router'
import { Button } from '../components/ui/button'
import { Label } from '../components/ui/label'
import { useState } from 'react'
import { Spinner } from '../components/ui/spinner'
import InteractiveMap from '../components/core/map'
import LocateControl from '../components/core/LocateControl'
import { getFullName } from '../utils/strings'
import useGetTaskById from '../api/hooks/useGetTaskById'

export const ActDetails = () => {
    const { id } = useParams<{ id: string }>()
    const [isLocating, setIsLocating] = useState(false)
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null)

    const { data: task, error, isLoading } = useGetTaskById({ id })

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

    if (isLoading) {
        return <Spinner />
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">Ошибка при загрузке задачи</div>
    }

    if (!task) {
        return <div className="p-4 text-center">Задача не найдена</div>
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

            <div className="border-t border-gray-200 p-5">
                <div className="m-5 flex flex-col gap-3">
                    <p className="text-14-20-regular select-none">{task.address}</p>
                    {/* <Input name="time" label="Время визита" /> */}
                    <Label text={getFullName(task.consumer)} icon="user" />
                    <Label
                        text={task.consumer.phone_number}
                        className="underline-black-1 underline underline-offset-2"
                        icon="phone"
                    />
                    <Label text={`${task.account_number}`} icon="idCard" />
                    <Label text={task.comment} icon="fileBlank" />
                </div>
                <Button className="w-full">Составить акт</Button>
            </div>
        </div>
    )
}
