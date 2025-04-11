import { range } from '../../../utils/helpers'
import { Task } from '../task'

interface ITaskFeed {
    className?: string
}

export const TaskFeed = (props: ITaskFeed) => {
    return (
        <>
            <div className="border-white-3 flex flex-col border-t">
                {range(10).map(() => {
                    return (
                        <div className="border-white-3 border-b">
                            <Task address="улица Пушкина 1, д 1, кв 1" status="todo" />
                        </div>
                    )
                })}
            </div>
        </>
    )
}
