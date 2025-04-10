import { twMerge } from 'tailwind-merge'

export interface IInputProps {
    className?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
}

export const Input = (props: IInputProps) => {
    return (
        <>
            <input
                type="text"
                className={twMerge(
                    'border-white-3 placeholder-grey-3 focus:border-black-2 h-[44px] rounded-[6px] border px-4 py-3 focus:border-[2px]',
                    props.className,
                )}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
            ></input>
        </>
    )
}
