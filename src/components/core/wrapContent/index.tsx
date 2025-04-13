import { useSafeArea } from '../../../lib/hooks/useSafeArea'
import { TChildren } from '../../../utils/types'
import { Header } from '../../ui/header'
import { Navbar } from '../../ui/navbar'

export const Wrapper = (props: { children: TChildren }) => {
    const safeArea = useSafeArea()

    return (
        <>
            <Header />

            <main className="flex-1 overflow-auto">{props.children}</main>

            <Navbar />
        </>
    )
}
