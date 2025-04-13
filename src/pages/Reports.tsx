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

const TaskFeedTabs = ({ reports }: { reports: IReport[] }) => {
    const sortReportsNewestFirst = (reports: IReport[]) => {
        return [...reports].sort((a, b) => {
            return new Date(b.for_date).getTime() - new Date(a.for_date).getTime()
        })
    }

    const tabs: Array<ITab> = [
        {
            id: 'today',
            label: 'Сегодня',
            content: (
                <TabsList
                    reports={sortReportsNewestFirst(
                        reports.filter((report) => {
                            const today = formatDate(new Date().toISOString(), true)
                            const reportDate = formatDate(report.for_date, true)
                            return today === reportDate
                        }),
                    )}
                />
            ),
        },
        {
            id: 'all',
            label: 'За все время',
            content: <TabsList reports={sortReportsNewestFirst(reports)} />,
        },
    ]

    return <Tabs tabs={tabs} defaultTab="today" />
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
                    <div key={report.id} className="border-white-3 cursor-pointer border-b">
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

    return <TaskFeedTabs reports={reports} />
}

export default Reports
