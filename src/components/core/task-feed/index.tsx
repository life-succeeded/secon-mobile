import { twMerge } from 'tailwind-merge'
import { range } from '../../../utils/helpers'
import { Task } from '../task'
import { ITab, Tabs } from '../../ui/tabs'

const tabs: Array<ITab> = [
    {
        id: 'all',
        label: 'Все',
        content: <TabsList />,
    },
    {
        id: 'todo',
        label: 'План',
        content: <TabsList />,
    },
    {
        id: 'inProgress',
        label: 'В работе',
        content: <TabsList />,
    },
    {
        id: 'done',
        label: 'Готово',
        content: <TabsList />,
    },
]

interface ITaskFeed {
    className?: string
}

function TabsList(props: ITaskFeed) {
    return (
        <>
            <div className={twMerge('border-white-3 flex flex-col', props.className)}>
                {range(10).map(() => {
                    return (
                        <div className="border-white-3 border-b">
                            <Task address="улица Пушкина 1, д 1, кв 1" status="todo" />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export const TaskFeed = (props: ITaskFeed) => {
    return (
        <>
            <Tabs tabs={tabs} defaultTab="all" />
        </>
    )
}
