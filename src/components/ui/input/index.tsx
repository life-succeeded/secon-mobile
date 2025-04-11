import { twMerge } from 'tailwind-merge'
import { fallback } from '../../../utils/helpers'

export interface IInputProps {
    className?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    label?: string
}

const renderLabel = (label: string) => {
    return (
        <>
            <label>{label}</label>
        </>
    )
}

export const Input = (props: IInputProps) => {
    return (
        <>
            <div className="flex flex-col gap-2">
                {props.label && renderLabel(props.label)}
                <input
                    type="text"
                    className={twMerge(
                        'border-white-3 placeholder-grey-3 bg-white-2 focus:border-black-2 h-[44px] rounded-[6px] border px-4 py-3 focus:border-[2px]',
                        props.className,
                    )}
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                ></input>
            </div>
        </>
    )
}
