import { twMerge } from 'tailwind-merge'
import { fallback, range } from '../../../utils/helpers'
import { useState } from 'react'

interface IProgressBarProps {
    className?: string
    value?: number
    maxValue?: number
}

export const ProgressBar = (props: IProgressBarProps) => {
    const maxValue = fallback(props.maxValue, 8)
    const value = fallback(props.value, 0)

    return (
        <div className={twMerge('flex flex-row gap-2', props.className)}>
            {range(maxValue).map((_, index) => (
                <span
                    key={index}
                    className={`h-2 w-4 rounded-[4px] ${
                        index < value ? 'bg-black-1' : 'bg-grey-3'
                    }`}
                ></span>
            ))}
        </div>
    )
}
