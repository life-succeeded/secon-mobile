import { useState } from 'react'
import {
    Control,
    Controller,
    FieldValues,
    UseControllerProps,
    useFormContext,
} from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

type TCheckboxChangeEvent = React.ChangeEvent<HTMLInputElement>

interface ICheckboxProps<TFormValues extends FieldValues = FieldValues, TValue = string> {
    label?: string
    checked?: boolean
    className?: string
    value: TValue
    onChange?: (e: TCheckboxChangeEvent) => void
    control?: Control<TFormValues>
    disabled?: boolean
    name: UseControllerProps<TFormValues>['name']
}

const Checkbox = <TFormValues extends FieldValues = FieldValues, TValue = string>(
    props: ICheckboxProps,
) => {
    const formContext = useFormContext<TFormValues>()

    const renderCheckbox = ({ field }: { field: any }) => (
        <label className={twMerge(`mb-[10px] inline-flex gap-2 select-none`, props.className)}>
            <input
                type="radio"
                value={props.value as unknown as string}
                checked={field.value === props.value}
                onChange={() => field.onChange(props.value)}
                disabled={props.disabled}
                className="accent-black-1 border-black-1 h-4 w-4 -translate-y-[-2px] border outline-none hover:shadow-none focus:ring-0 focus:outline-none"
            />
            <span className="text-14-20-regular">{props.label}</span>
        </label>
    )

    if (props.control || formContext) {
        const actualControl = props.control ?? formContext.control
        return (
            <Controller
                name={props.name as UseControllerProps<TFormValues>['name']}
                control={actualControl as Control<TFormValues, any, TFormValues>}
                render={renderCheckbox}
            />
        )
    }

    return (
        <label className={twMerge(`mb-[10px] inline-flex gap-2 select-none`, props.className)}>
            <input
                type="radio"
                name={props.name}
                value={props.value as unknown as string}
                disabled={props.disabled}
                className="accent-black-1 border-black-1 h-4 w-4 -translate-y-[-2px] border outline-none hover:shadow-none focus:ring-0 focus:outline-none"
            />
            <span className="text-14-20-regular">{props.label}</span>
        </label>
    )
}

export default Checkbox
