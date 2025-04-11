import { TChildren, TOnClickHandler } from '../../../utils/types'
import { twMerge } from 'tailwind-merge'
import { IIconParams, TIconVariant } from '../../icons/types'
import { HeartIcon } from '../../icons/bxHeart'
import { fallback } from '../../../utils/helpers'
import { ArrowIcon } from '../../icons/bxArrow'
import { renderIcon } from '../../icons/helpers'
import { tv } from 'tailwind-variants'

/* focus:outline-none 
  focus:bg-[#5c8a8a]*/

const button = tv({
    base: 'flex h-[44px] cursor-pointer items-center justify-center rounded-[6px] p-3 text-white select-none focus:outline-none ',
    variants: {
        color: {
            default: 'bg-black-1 hover:bg-black-3 active:bg-black-3 focus:bg-black-1',
            transparent:
                'bg-transparent hover:bg-black-3/10 active:bg-black-3/10 focus:bg-transparent',
        },
    },
})

type TButtonVariants = keyof typeof button.variants.color

interface IButtonProps {
    onClick?: TOnClickHandler
    className?: string
    children?: TChildren
    icon?: TIconVariant
    variant?: TButtonVariants
    iconParams?: IIconParams
}

const renderChildrenWithIcon = (
    variant: TIconVariant,
    children?: TChildren,
    iconParams?: IIconParams,
) => {
    return (
        <div className="flex items-center justify-center gap-[3px]">
            {renderIcon(variant)}
            {children}
        </div>
    )
}

export const Button = (props: IButtonProps) => {
    return (
        <>
            <button
                className={button({
                    color: fallback(props.variant, 'default'),
                    className: props.className,
                })}
                onClick={props.onClick}
            >
                {props.icon
                    ? renderChildrenWithIcon(props.icon, props.children, props.iconParams)
                    : props.children}
            </button>
        </>
    )
}
