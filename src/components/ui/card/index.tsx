import { TChildren } from '../../../utils/types'

interface ICardProps {
    children?: TChildren
    title: string
}

const Card = (props: ICardProps) => {
    return (
        <div className="bg-white-1 flex flex-col gap-3 px-5 py-3 select-none">
            <h2 className="text-14-20-medium text-black-1">{props.title}</h2>
            {props.children}
        </div>
    )
}

export default Card
