import {
    FieldError,
    UseFormRegister,
    Path,
    UseFormStateProps,
    UseFormStateReturn,
    useFormContext,
} from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { fp } from '../../../lib/fp'

type CheckboxProps<T extends Record<string, unknown>> = {
    label?: string
    name: Path<T>
    required?: boolean
    className?: string
    disabled?: boolean
}

export const Checkbox = <T extends Record<string, unknown>>({
    label,
    name,
    required = false,
    className = '',
    disabled = false,
}: CheckboxProps<T>) => {
    const { formState, register } = useFormContext()
    return (
        <div className={`flex flex-col ${className}`}>
            <label className={twMerge(`mb-[10px] inline-flex gap-2 select-none`, className)}>
                <input
                    type="checkbox"
                    className={`accent-black-1 border-black-1 h-4 w-4 -translate-y-[-2px] border outline-none hover:shadow-none focus:ring-0 focus:outline-none ${
                        disabled ? 'cursor-not-allowed opacity-50' : ''
                    } ${fp.has(`errors.${name}.message`, formState) ? 'border-red-500' : 'border-gray-300'} `}
                    {...register(name, { required })}
                    disabled={disabled}
                />
                {label && (
                    <span
                        className={`text-14-20-regular ${disabled ? 'opacity-50' : ''} ${
                            fp.has(`errors.${name}.message`, formState) ? 'text-red-500' : ''
                        }`}
                    >
                        {label}
                    </span>
                )}
            </label>
            <div className="text-12-16-medium text-red-500">
                {fp.getOr('', `errors.${name}.message`, formState)}
                {fp.has(`errors.${name}.message`, formState)}
            </div>
        </div>
    )
}
