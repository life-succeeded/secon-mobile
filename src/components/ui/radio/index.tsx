// components/ui/radio.tsx
import React from 'react'

type RadioProps = {
    name: string
    value: string
    label: string
    checked?: boolean
    onChange?: () => void
    wrapperClassName?: string
}

const Radio: React.FC<RadioProps> = ({
    name,
    value,
    label,
    checked,
    onChange,
    wrapperClassName = '',
}) => {
    return (
        <label className={`flex items-center gap-2 ${wrapperClassName}`}>
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="accent-blue-500"
            />
            <span>{label}</span>
        </label>
    )
}

export default Radio
