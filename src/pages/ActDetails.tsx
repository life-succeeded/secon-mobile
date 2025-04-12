// src/pages/ActDetails.tsx
import { useParams } from 'react-router'
import { Button } from '../components/ui/button'
import { Act } from '../components/core/act'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useEffect, useState } from 'react'
import { getTaskById } from '../api/api'
import { ITask } from '../api/api.types'
import { Spinner } from '../components/ui/spinner'

export const ActDetails = () => {
    const { id } = useParams<{ id: string }>()

    const [task, setTask] = useState<ITask>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await getTaskById(id)
                setTask(response.data)
            } catch (err) {
                setError('Failed to load tasks')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchTask()
    }, null)

    if (loading) {
        return <Spinner />
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex-grow overflow-auto">
                <div>map</div>
                <div className="m-5 flex flex-col gap-3">
                    <p className="text-14-20-regular select-none">ул. Пушкина, д. 1, кв. 1</p>

                    <Input label="Время визита" />

                    <Label text={'Пресняков Артём Дмитриевич'} icon="user" />
                    <Label
                        text={'8 800 555 35 35'}
                        className="underline-black-1 underline underline-offset-2"
                        icon="phone"
                    />
                    <Label text={'70ББ000584'} icon="idCard" />
                    <Label text={'Причина: плохой очень человек'} icon="fileBlank" />
                </div>
            </div>

            <div className="border-t border-gray-200 p-5">
                <Button className="w-full">Составить акт</Button>
            </div>
        </div>
    )
}
