import { twMerge } from 'tailwind-merge'
import { fallback } from '../../../utils/helpers'
import { renderIcon } from '../../icons/helpers'
import { Badge, TBadgeStatus } from '../../ui/badge'
import { useId } from 'react'

type TTaskStatus = 'inProgress' | 'todo' | 'done'

interface ITaskProps {
    className?: string
    address: string
    href?: string
    status?: TTaskStatus
    time?: string
}

const badgeState: Array<{ state: TTaskStatus; variant: string; text: string }> = [
    {
        state: 'inProgress',
        variant: 'yellow',
        text: 'В работе',
    },
    {
        state: 'todo',
        variant: 'blue',
        text: 'План',
    },
    {
        state: 'done',
        variant: 'green',
        text: 'Готово',
    },
] as const

const renderBadgeByStatus = (state: TTaskStatus) => {
    const type = badgeState.find((item) => item.state === fallback(state, 'todo')) as {
        variant: TBadgeStatus
        text: string
    }

    return <Badge className="h-5 justify-end p-2" {...type} />
}

export const Task = (props: ITaskProps) => {
    const id = useId();

    return (
        <div className="text-14-20-regular flex flex-row justify-between px-5 py-3 select-none">
            <div className="flex flex-col justify-start gap-3">
                <span className="text-14-20-regular">{props.address}</span>
                <div className="flex flex-row items-center gap-[6px]">
                    {renderIcon('time', {
                        width: 16,
                        height: 16,
                        fill: '#8f8f8f',
                        className: twMerge('text-grey-1'),
                    })}
                    <div id={id} className="text-14-20-regular text-black-1 hover:text-black-3 underline-offset-2">
                        {props.time}
                    </div>
                </div>
            </div>
            {renderBadgeByStatus(props.status)}
        </div>
    )
}
