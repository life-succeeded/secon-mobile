import { TChildren } from '../../../utils/types'

export const FullScreenWrapper = (props: { children: TChildren }) => {
    return (
        <>
            <div
                style={{ height: `${(window.innerHeight)}px` }}

                className="flex flex-col">{props.children}</div>
        </>
    )
}
