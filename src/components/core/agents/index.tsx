import { twMerge } from 'tailwind-merge'
import { renderIcon } from '../../icons/helpers'
import { getFullName } from '../../../utils/strings'

interface IAgentProps {
    className?: string
    agents: Array<{ name: string; surname: string; patronymic: string }>
}

export const Agents = (props: IAgentProps) => {
    return (
        <>
            <div
                className={twMerge(
                    'text-14-20-regular flex flex-col gap-4 px-5 py-8 select-none',
                    props.className,
                )}
            >
                {props.agents.map((agent) => {
                    return (
                        <div className="flex flex-row items-center gap-[6px] select-none">
                            {renderIcon('user', {
                                width: 16,
                                height: 16,
                                fill: '#8f8f8f',
                            })}
                            <p className="text-14-20-regular text-black-1 hover:text-black-3 underline-offset-2">
                                {getFullName(agent)}
                            </p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
