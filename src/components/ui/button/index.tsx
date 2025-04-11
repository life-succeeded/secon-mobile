import { TChildren, TOnClickHandler } from '../../../utils/types'
import { twMerge } from 'tailwind-merge'
import { TIconVariant } from '../../icons/types'
import { HeartIcon } from '../../icons/bxHeart'
import { fallback } from '../../../utils/helpers'
import { ArrowIcon } from '../../icons/bxArrow'

interface IButtonProps {
    onClick?: TOnClickHandler
    className?: string
    children?: TChildren
    icon?: TIconVariant
}

const renderIcon = (variant: TIconVariant) => {
    switch (variant) {
        case 'heart':
            return <HeartIcon fill="white" width={16} height={16} />
        case 'arrow':
            return <ArrowIcon fill="white" width={16} height={16} />
        default:
            return <></>
    }
}
const renderChildrenWithIcon = (variant: TIconVariant, children?: TChildren) => {
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
                className={twMerge(
                    'bg-black-1 hover:bg-black-3 flex h-[44px] cursor-pointer items-center justify-center rounded-[6px] p-3 text-white select-none',
                    props.className,
                )}
                onClick={props.onClick}
            >
                {props.icon ? renderChildrenWithIcon(props.icon, props.children) : props.children}
            </button>
        </>
    )
}
