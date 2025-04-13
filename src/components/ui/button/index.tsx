import { TChildren, TOnClickHandler } from '../../../utils/types'
import { twMerge } from 'tailwind-merge'
import { IIconParams, TIconVariant } from '../../icons/types'
import { HeartIcon } from '../../icons/bxHeart'
import { fallback } from '../../../utils/helpers'
import { ArrowIcon } from '../../icons/bxArrow'
import { renderIcon } from '../../icons/helpers'
import { tv } from 'tailwind-variants'

const button = tv({
    base: [
        'flex h-[44px] cursor-pointer items-center justify-center rounded-[6px] p-3 text-white select-none',
        'transition-colors duration-200',
        'focus:outline-none',
        'active:scale-95',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:active:scale-100', // Добавленные стили для disabled состояния
    ],
    variants: {
        color: {
            default: 'bg-black-1 hover:bg-black-3 active:bg-black-3',
            transparent: [
                'bg-transparent',
                'hover:bg-black-3/10',
                'active:bg-black-3/10',
                '!active:bg-transparent',
                'disabled:hover:bg-transparent', // Особый случай для transparent варианта
            ],
            blue: 'bg-[#9747FF]',
        },
    },
    defaultVariants: {
        color: 'default',
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
    type?: 'submit' | 'reset' | 'button'
    disabled?: boolean
}

const renderChildrenWithIcon = (
    variant: TIconVariant,
    children?: TChildren,
    iconParams?: IIconParams,
) => {
    return (
        <div className="flex touch-none items-center justify-center gap-[3px] select-none focus:outline-none active:scale-98">
            {renderIcon(variant, iconParams)}
            {children}
        </div>
    )
}

export const Button = (props: IButtonProps) => {
    return (
        <button
            type={fallback(props.type, undefined)}
            className={button({
                color: fallback(props.variant, 'default'),
                className: props.className,
            })}
            onClick={props.disabled ? undefined : props.onClick} // Отключаем обработчик, если кнопка disabled
            disabled={props.disabled}
        >
            {props.icon
                ? renderChildrenWithIcon(props.icon, props.children, props.iconParams)
                : props.children}
        </button>
    )
}
