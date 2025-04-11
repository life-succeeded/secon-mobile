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
    base: [
      'flex h-[44px] cursor-pointer items-center justify-center rounded-[6px] p-3 text-white select-none',
      'transition-colors duration-200',
      'focus:outline-none',
      'active:scale-95', 
    ],
    variants: {
      color: {
        default: 'bg-black-1 hover:bg-black-3 active:bg-black-3',
        transparent: [
          'bg-transparent',
          'hover:bg-black-3/10',
          'active:bg-black-3/10',
          '!active:bg-transparent', 
        ],
      },
    },
    defaultVariants: {
      color: 'default',
    },
  });

type TButtonVariants = keyof typeof button.variants.color

interface IButtonProps {
    onClick?: TOnClickHandler
    className?: string
    children?: TChildren
    icon?: TIconVariant
    variant?: TButtonVariants
    iconParams?: IIconParams
    type?: 'submit'
    disabled?: boolean
}

const renderChildrenWithIcon = (
    variant: TIconVariant,
    children?: TChildren,
    iconParams?: IIconParams,
) => {
    return (
        <div className="flex items-center justify-center gap-[3px] active:scale-98 focus:outline-none select-none touch-none">
            {renderIcon(variant)}
            {children}
        </div>
    )
}

export const Button = (props: IButtonProps) => {
    return (
        <>
            <button
                type={fallback(props.type, undefined)}
                className={button({
                    color: fallback(props.variant, 'default'),
                    className: props.className,
                })}
                onClick={props.onClick}
                disabled={props.disabled}
            >
                {props.icon
                    ? renderChildrenWithIcon(props.icon, props.children, props.iconParams)
                    : props.children}
            </button>
        </>
    )
}

