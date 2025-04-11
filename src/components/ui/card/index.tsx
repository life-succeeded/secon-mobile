import { TChildren } from '../../../utils/types'

interface ICardProps {
    children?: TChildren
    title: string
}

const Card = (props: ICardProps) => {
    return (
        <div className="bg-white-1 border-grey-3 flex flex-col gap-3 rounded-md border px-5 py-3">
            <h2 className="text-14-20-medium font-inter text-black-1">{props.title}</h2>
            {props.children}
        </div>
    )
}

export default Card
