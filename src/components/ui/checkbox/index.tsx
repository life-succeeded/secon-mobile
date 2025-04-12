import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

type TCheckboxChangeEvent = React.ChangeEvent<HTMLInputElement>

interface ICheckboxProps {
    label?: string
    checked?: boolean
    className?: string
    onChange?: (e: TCheckboxChangeEvent) => void
}

const Checkbox = (props: ICheckboxProps) => {
    const [checked, setChecked] = useState<boolean>(props.checked || false)

    const handleCheckboxChange = (event: TCheckboxChangeEvent) => {
        setChecked(event.target.checked)

        if (props.onChange) {
            props.onChange(event)
        }
    }

    return (
        <label
            className={twMerge(
                'mb-[10px] inline-flex items-center gap-2 select-none',
                props.className,
            )}
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
                className="accent-black-1 border-black-1 h-4 w-4 border outline-none hover:shadow-none focus:ring-0 focus:outline-none"
            />
            <span className="text-sm">{props.label}</span>
        </label>
    )
}

export default Checkbox
