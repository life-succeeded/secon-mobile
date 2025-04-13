import { Link } from 'react-router'
import { twMerge } from 'tailwind-merge'
import { IInspection, IReport, ITask } from '../api/api.types'
import { Task } from '../components/core/task'
import { ITab, Tabs } from '../components/ui/tabs'
import { formatDate } from '../utils/date'
import { getTasks } from '../api/api'
import { Spinner } from '../components/ui/spinner'
import { useAuth } from '../lib/hooks/useAuth'
import useGetAllReports from '../api/hooks/useGetAllReports'
import Report from '../components/core/report'
import useGetInspectionsByBrigadeId from '../api/hooks/useGetInspectionsByBrigadeId'
import Inspection from '../components/core/inspection'

const ActsFeedTabs = ({ inspections }: { inspections: IInspection[] }) => {
    const tabs: Array<ITab> = [
        {
            id: 'today',
            label: 'Сегодня',
            content: (
                <InspectionList
                    inspections={inspections.filter((inspection) => {
                        const today = formatDate(new Date().toISOString(), true)
                        const reportDate = formatDate(inspection.inspection_date, true)
                        return today === reportDate
                    })}
                />
            ),
        },
        {
            id: 'all',
            label: 'За все время',
            content: <InspectionList inspections={inspections} />,
        },
    ]

    return <Tabs tabs={tabs} defaultTab="all" />
}

interface IInspectionFee {
    className?: string
}

interface IInspectionListProps extends IInspectionFee {
    inspections: IInspection[]
}

function InspectionList(props: IInspectionListProps) {
    return (
        <div className={twMerge('border-white-3 flex flex-col', props.className)}>
            {props.inspections.map((report) => {
                return (
                    <div className="border-white-3 cursor-pointer border-b">
                        <Inspection
                            address={report.address}
                            act={report.resolution_file}
                            images={report.images}
                        />
                    </div>
                )
            })}
        </div>
    )
}

function Acts() {
    const { getAuthData } = useAuth()

    const {
        data: inspections,
        isLoading,
        error,
    } = useGetInspectionsByBrigadeId({ id: getAuthData().brigadeId })

    if (isLoading) {
        return <Spinner />
    }

    if (error) {
        return <div className="p-4 text-center text-red-500">Ошибка при загрузке отчетов</div>
    }

    if (!inspections) {
        return <div className="p-4 text-center">Отчеты не найдены</div>
    }

    return <ActsFeedTabs inspections={inspections} />
}

export default Acts
