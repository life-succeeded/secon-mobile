import { useState } from 'react'

type TRadioChangeEvent = React.ChangeEvent<HTMLInputElement>

interface IRadioProps {
    label?: string
    checked?: boolean
    onChange?: (e: TRadioChangeEvent) => void
    name: string
}

const Radio = (props: IRadioProps) => {
    const [checked, setChecked] = useState<boolean>(props.checked || false)

    const handleCheckboxChange = (event: TRadioChangeEvent) => {
        setChecked(event.target.checked)

        if (props.onChange) {
            props.onChange(event)
        }
    }

    return (
        <label className="mb-[10px] inline-flex items-center gap-2 select-none">
            <input
                type="radio"
                name={props.name}
                checked={checked}
                onChange={handleCheckboxChange}
                className="accent-black-1 border-black-1 h-4 w-4 border outline-none hover:shadow-none focus:ring-0 focus:outline-none"
            />
            <span className="text-sm">{props.label}</span>
        </label>
    )
}

export default Radio
