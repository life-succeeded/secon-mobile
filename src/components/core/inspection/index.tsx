import { twMerge } from 'tailwind-merge'
import { renderIcon } from '../../icons/helpers'
import { IFile } from '../../../api/api.types'
import { formatDate } from '../../../utils/date'

interface IInspectionProps {
    className?: string
    act: IFile
    images: IFile[]
    address: string
}

const Inspection = (props: IInspectionProps) => {
    return (
        <div className="text-14-20-regular flex flex-col gap-3 px-5 py-3">
            <span className="text-14-20-regular">{props.address}</span>

            <div className="flex flex-row items-center gap-[6px]">
                {renderIcon('file', {
                    width: 16,
                    height: 16,
                    fill: '#8f8f8f',
                    className: twMerge('text-grey-1'),
                })}
                <a
                    href={props.act.url}
                    className="text-14-20-regular text-black-1 hover:text-black-3 underline-black-1 underline underline-offset-2"
                >
                    {props.act.name}
                </a>
            </div>

            {props.images.map((image) => {
                return (
                    <div className="flex flex-row items-center gap-[6px]">
                        {renderIcon('image', {
                            width: 16,
                            height: 16,
                            fill: '#8f8f8f',
                            className: twMerge('text-grey-1'),
                        })}
                        <a
                            href={image.url}
                            className="text-14-20-regular text-black-1 hover:text-black-3 underline-black-1 underline underline-offset-2"
                        >
                            {image.name}
                        </a>
                    </div>
                )
            })}
        </div>
    )
}

export default Inspection
