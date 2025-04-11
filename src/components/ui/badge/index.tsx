import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

const badge = tv({
    base: 'font-semibold text-sm rounded-[6px]',
    variants: {
        color: {
            blue: 'bg-blue-1 text-blue-2 border-2 border-blue-3',
            green: 'bg-yellow-1 text-yellow-2 border-2 border-yellow-3',
            yellow: 'bg-green-1 text-green-2 border-2 border-green-3',
        },
    },
})

type TBadgeStatus = keyof typeof badge.variants.color

interface IBadgeProps {
    className?: string
    variant: TBadgeStatus
    text: string
}

export const Badge = ({ variant, className, text }: IBadgeProps) => {
    return (
        <span
            className={badge({
                color: variant,
                className: twMerge('flex justify-center', className),
            })}
        >
            {text}
        </span>
    )
}
