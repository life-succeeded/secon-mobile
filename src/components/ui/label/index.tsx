import { fallback } from '../../../utils/helpers'
import { renderIcon } from '../../icons/helpers'
import { IIconParams, TIconVariant } from '../../icons/types'
import { twMerge } from 'tailwind-merge'

interface ILabelProps {
    className?: string
    icon: TIconVariant
    text: string
    iconParams?: IIconParams
}

export const Label = (props: ILabelProps) => {
    return (
        <div
            className={twMerge('flex flex-row items-center gap-[6px] select-none', props.className)}
        >
            {renderIcon(
                props.icon,
                fallback(props.iconParams, {
                    width: 16,
                    height: 16,
                    fill: '#8f8f8f',
                }),
            )}
            <p className="text-14-20-regular text-black-1 hover:text-black-3 underline-offset-2">
                {props.text}
            </p>
        </div>
    )
}
