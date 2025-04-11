import { BackButton } from '../../core/backButton'
import { LogoutButton } from '../../core/logoutButton'

export const Header = () => {
    return (
        <>
            <div className="border-b-white-3 relative flex h-16 w-full items-center justify-center border-b py-4">
                <div className="absolute left-4">
                    <BackButton />
                </div>

                <span className="text-black-1 text-[24px] leading-[32px] font-medium">
                    Заголовок
                </span>

                <div className="absolute right-4">
                    <LogoutButton />
                </div>
            </div>
        </>
    )
}
