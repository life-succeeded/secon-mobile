import { twMerge } from 'tailwind-merge'
import { range } from '../../../utils/helpers'
import { Task } from '../task'
import { ITab, Tabs } from '../../ui/tabs'
import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import { getTasks } from '../../../api/api'
import { ITask } from '../../../api/api.types'
import { useAuth } from '../../../lib/hooks/useAuth'
import { formatDate } from '../../../utils/date'
import { Spinner } from '../../ui/spinner'

const TaskFeedTabs = ({ tasks }: { tasks: ITask[] }) => {
    const tabs: Array<ITab> = [
        {
            id: 'all',
            label: 'Все',
            content: <TabsList tasks={tasks} />,
        },
        {
            id: 'todo',
            label: 'План',
            content: <TabsList tasks={tasks.filter((task) => task.status === 0)} />,
        },
        {
            id: 'inProgress',
            label: 'В работе',
            content: <TabsList tasks={tasks.filter((task) => task.status === 1)} />,
        },
        {
            id: 'done',
            label: 'Готово',
            content: <TabsList tasks={tasks.filter((task) => task.status === 2)} />,
        },
    ]

    return <Tabs tabs={tabs} defaultTab="all" />
}

interface ITaskFeed {
    className?: string
}

interface ITabsListProps extends ITaskFeed {
    tasks: ITask[]
}

function TabsList(props: ITabsListProps) {
    const statusMap = {
        0: 'todo',
        1: 'inProgress',
        2: 'done',
    } as const

    return (
        <div className={twMerge('border-white-3 flex flex-col', props.className)}>
            {props.tasks.map((task) => {
                return (
                    <Link key={task.id} to={`/acts/${task.id}`}>
                        <div className="border-white-3 cursor-pointer border-b">
                            <Task
                                address={task.address}
                                status={statusMap[task.status]}
                                time={formatDate(task.visit_date)}
                            />
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export const TaskFeed = (props: ITaskFeed) => {
    const [tasks, setTasks] = useState<ITask[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const { getAuthData } = useAuth()
    const { brigadeId } = getAuthData()

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await getTasks(brigadeId)
                setTasks(response.data)
            } catch (err) {
                setError('Failed to load tasks')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchTasks()
    }, [])

    if (loading) {
        return <Spinner />
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">{error}</div>
    }

    return <TaskFeedTabs tasks={tasks} />
}
