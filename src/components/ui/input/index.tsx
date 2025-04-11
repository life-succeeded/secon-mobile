import { twMerge } from 'tailwind-merge'

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
    label?: string
    error?: string
}

export const Input = ({ className, label, error, ...props }: IInputProps) => {
    const hasError = !!error

    return (
        <div className="flex w-full flex-col gap-2">
            {label && <label className="text-14-20-regular">{label}</label>}
            <input
                {...props}
                className={twMerge(
                    'border-white-3 placeholder-grey-3 bg-white-2 h-[44px] rounded-[6px] border px-4 py-3',
                    'focus:border-black-2 focus:border-[2px]',
                    'active:border-black-2 active:border-[2px]',
                    hasError && 'border-red-500 focus:border-red-500 active:border-red-500',
                    className,
                )}
            />
            {error && <span className="text-12-16-medium text-red-500">{error}</span>}
        </div>
    )
}
