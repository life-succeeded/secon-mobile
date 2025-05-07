import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { fp } from '../../../lib/fp'
import { forwardRef } from 'react'

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
    label?: string
    name: string
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
    ({ className, label, name, ...props }, ref) => {
        const { register, formState } = useFormContext()

        return (
            <div className="flex w-full flex-col gap-2">
                {label && <label className="text-14-20-regular">{label}</label>}
                <input
                    {...props}
                    ref={ref}
                    className={twMerge(
                        'border-white-3 placeholder-grey-3 bg-white-2 h-[44px] rounded-[6px] border px-4 py-3',
                        'focus:border-black-2 focus:border-[2px]',
                        'active:border-black-2 active:border-[2px]',
                        fp.has(`errors.${name}.message`, formState) &&
                            'border-red-500 focus:border-red-500 active:border-red-500',
                        className,
                    )}
                    {...register(name, { required: true })}
                />
                <div className="text-12-16-medium text-red-500">
                    {fp.getOr('', `errors.${name}.message`, formState)}
                    {fp.has(`errors.${name}.message`, formState)}
                </div>
            </div>
        )
    },
)

Input.displayName = 'Input'
