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
      'transition-colors duration-200', // Добавляем плавный переход
      'focus:outline-none', // Убираем стандартный outline
      'active:scale-95', // Легкая анимация при нажатии
    ],
    variants: {
      color: {
        default: 'bg-black-1 hover:bg-black-3 active:bg-black-3',
        transparent: [
          'bg-transparent',
          'hover:bg-black-3/10',
          'active:bg-black-3/10',
          '!active:bg-transparent', // Важно для мобильных устройств
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
      <button
        className={button({
          color: fallback(props.variant, 'default'),
          className: props.className,
        })}
        onClick={props.onClick}
        onTouchEnd={(e) => {
          // Явный сброс состояния для мобильных устройств
          e.currentTarget.classList.remove('active');
        }}
      >
        {props.icon
          ? renderChildrenWithIcon(props.icon, props.children, props.iconParams)
          : props.children}
      </button>
    );
  };
