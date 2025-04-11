import Card from '../../ui/card'
import Item from '../../ui/item'

interface IActProps {
    className?: string
    actName: string
    imageName: string
    address: string
}

export const Act = (props: IActProps) => {
    return (
        <Card title={props.address}>
            <div className="space-y-3">
                <Item icon="file" text={props.actName} iconParams={{ height: 16, width: 16 }} />
                <Item icon="image" text={props.imageName} iconParams={{ height: 16, width: 16 }} />
            </div>
        </Card>
    )
}
