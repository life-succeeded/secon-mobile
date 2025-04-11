import { BackButton } from '../../core/backButton'
import { LogoutButton } from '../../core/logoutButton'
import { useRouteTitle } from '../../../lib/hooks/useRouteTitle'

export const Header = () => {
    const title = useRouteTitle()

    return (
        <div className="border-b-white-3 relative flex h-16 max-h-16 min-h-16 w-full items-center justify-center border-b">
            <div className="absolute left-4">
                <BackButton />
            </div>

            <span className="text-black-1 text-[24px] leading-[32px] font-medium">{title}</span>

            <div className="absolute right-4">
                <LogoutButton />
            </div>
        </div>
    )
}
