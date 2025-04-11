import { TChildren } from '../../../utils/types'

export const FullScreenWrapper = (props: { children: TChildren }) => {
    return (
        <>
            <div className="flex h-screen flex-col">{props.children}</div>
        </>
    )
}
