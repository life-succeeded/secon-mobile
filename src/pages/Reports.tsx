import { Link } from 'react-router'
import { twMerge } from 'tailwind-merge'
import { IReport, ITask } from '../api/api.types'
import { Task } from '../components/core/task'
import { ITab, Tabs } from '../components/ui/tabs'
import { formatDate } from '../utils/date'
import { getTasks } from '../api/api'
import { Spinner } from '../components/ui/spinner'
import { useAuth } from '../lib/hooks/useAuth'
import useGetAllReports from '../api/hooks/useGetAllReports'
import Report from '../components/core/report'

const ReportFeedTabs = ({ reports }: { reports: IReport[] }) => {
    const tabs: Array<ITab> = [
        {
            id: 'today',
            label: 'Сегодня',
            content: (
                <TabsList
                    reports={reports.filter((report) => {
                        const today = formatDate(new Date().toISOString(), true)
                        const reportDate = formatDate(report.for_date, true)
                        return today === reportDate
                    })}
                />
            ),
        },
        {
            id: 'all',
            label: 'За все время',
            content: <TabsList reports={reports} />,
        },
    ]

    return <Tabs tabs={tabs} defaultTab="all" />
}

interface IReportFeed {
    className?: string
}

interface IReportListProps extends IReportFeed {
    reports: IReport[]
}

function TabsList(props: IReportListProps) {
    return (
        <div className={twMerge('border-white-3 flex flex-col', props.className)}>
            {props.reports.map((report) => {
                return (
                    <div className="border-white-3 cursor-pointer border-b">
                        <Report file={report.file} date={report.for_date} />
                    </div>
                )
            })}
        </div>
    )
}

function Reports() {
    const { data: reports, isLoading, error } = useGetAllReports()

    if (isLoading) {
        return <Spinner />
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">Ошибка при загрузке отчетов</div>
    }

    if (!reports) {
        return <div className="p-4 text-center">Отчеты не найдены</div>
    }

    return <ReportFeedTabs reports={reports} />
}

export default Reports

/*
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
*/
