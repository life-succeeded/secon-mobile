import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

interface IAlertProps {
    className?: string
    text: string
}

export const Alert = ({ className, text }: IAlertProps) => {
    return (
        <span
            className={twMerge(
                'bg-green-1 border-green-3 text-14-20-medium text-green-2 flex justify-center rounded-[6px] border-2 p-4 font-semibold',
                className,
            )}
        >
            {text}
        </span>
    )
}
