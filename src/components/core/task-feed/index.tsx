import { twMerge } from 'tailwind-merge'
import { range } from '../../../utils/helpers'
import { Task } from '../task'
import { ITab, Tabs } from '../../ui/tabs'
import { Link } from 'react-router'

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
                        <Link to={'/acts/1'}>
                            <div className="border-white-3 cursor-pointer border-b">
                                <Task address="улица Пушкина 1, д 1, кв 1" status="todo" />
                            </div>
                        </Link>
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
