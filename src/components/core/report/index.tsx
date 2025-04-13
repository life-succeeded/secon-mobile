import { twMerge } from 'tailwind-merge'
import { fallback } from '../../../utils/helpers'
import { renderIcon } from '../../icons/helpers'
import Card from '../../ui/card'
import Item from '../../ui/item'
import { Badge, TBadgeStatus } from '../../ui/badge'
import { IFile } from '../../../api/api.types'
import { formatDate } from '../../../utils/date'

type TTaskStatus = 'inProgress' | 'todo' | 'done'

interface IReportProps {
    className?: string
    file: IFile
    date: string
}

const Report = (props: IReportProps) => {
    return (
        <div className="text-14-20-regular flex flex-col gap-3 px-5 py-3">
            <span className="text-14-20-regular">{formatDate(props.date, true)}</span>
            <div className="flex flex-row items-center gap-[6px]">
                {renderIcon('file', {
                    width: 16,
                    height: 16,
                    fill: '#8f8f8f',
                    className: twMerge('text-grey-1'),
                })}
                <a
                    href={props.file.url}
                    className="text-14-20-regular text-black-1 hover:text-black-3 underline-black-1 underline underline-offset-2"
                >
                    {props.file.name}
                </a>
            </div>
        </div>
    )
}

export default Report
