import { useFormContext, Controller } from 'react-hook-form'
import type { FieldValues, UseControllerProps, Control } from 'react-hook-form'

type TRadioProps<TFormValues extends FieldValues = FieldValues, TValue = string> = {
    name: UseControllerProps<TFormValues>['name']
    value: TValue
    label: string
    disabled?: boolean
    className?: string
    control?: Control<TFormValues>
}

export default function Radio<TFormValues extends FieldValues = FieldValues, TValue = string>({
    name,
    value,
    label,
    disabled = false,
    className = '',
    control,
}: TRadioProps<TFormValues, TValue>) {
    const formContext = useFormContext<TFormValues>()

    const renderRadio = ({ field }: { field: any }) => (
        <label className={`mb-[10px] inline-flex gap-2 select-none ${className}`}>
            <input
                type="radio"
                value={value as unknown as string}
                checked={field.value === value}
                onChange={() => field.onChange(value)}
                disabled={disabled}
                className="accent-black-1 border-black-1 h-4 w-4 -translate-y-[-2px] border outline-none hover:shadow-none focus:ring-0 focus:outline-none"
            />
            <span className="text-14-20-regular">{label}</span>
        </label>
    )

    if (control || formContext) {
        const actualControl = control ?? formContext.control
        return <Controller name={name} control={actualControl} render={renderRadio} />
    }

    return (
        <label className={`mb-[10px] inline-flex gap-2 select-none ${className}`}>
            <input
                type="radio"
                name={name}
                value={value as unknown as string}
                disabled={disabled}
                className="accent-black-1 border-black-1 h-4 w-4 -translate-y-[-2px] border outline-none hover:shadow-none focus:ring-0 focus:outline-none"
            />
            <span className="text-14-20-regular">{label}</span>
        </label>
    )
}
