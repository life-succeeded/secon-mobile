import { FileText, ImageIcon } from 'lucide-react'
import { TChildren } from '../../../utils/types'
import { IIconParams, TIconVariant } from '../../icons/types'
import { renderIcon } from '../../icons/helpers'
import { twMerge } from 'tailwind-merge'
import { fallback } from '../../../utils/helpers'

interface IItemProps {
    text: string
    icon: TIconVariant
    iconParams?: IIconParams
}

const Item = (props: IItemProps) => {
    return (
        <>
            <div className="flex flex-row items-center gap-2">
                {renderIcon(props.icon, {
                    ...props.iconParams,
                    fill: '#8f8f8f',
                    className: twMerge('text-grey-1', fallback(props?.iconParams?.className, '')),
                })}
                <a
                    href="#"
                    className="text-14-20-regular font-inter text-black-1 hover:text-black-3 underline underline-offset-2"
                >
                    {props.text}
                </a>
            </div>
        </>
    )
}

export default Item
