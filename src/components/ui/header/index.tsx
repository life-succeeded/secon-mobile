import { BackButton } from '../../core/backButton'
import { LogoutButton } from '../../core/logoutButton'
import { useRouteTitle } from '../../../lib/hooks/useRouteTitle'
import { useDispatch } from 'react-redux'

interface IHeaderProps {
    hideControls?: boolean
}

export const Header = (props: IHeaderProps) => {
    const title = useRouteTitle()
    const dispatch = useDispatch();

    const onBackClick = () => {
      dispatch(handleHeaderBack()); 
    };
  
    return (
        <div className="border-b-white-3 relative flex h-16 max-h-16 min-h-16 w-full items-center justify-center border-b">
            <div
                className="absolute left-4"
                style={{ visibility: props.hideControls ? 'hidden' : 'visible' }}
            >
                <BackButton />
            </div>

            <span className="text-black-1 text-[24px] leading-[32px] font-medium">{title}</span>

            <div
                className="absolute right-4"
                style={{ visibility: props.hideControls ? 'hidden' : 'visible' }}
            >
                <LogoutButton />
            </div>
        </div>
    )
}
function handleHeaderBack(): any {
    throw new Error('Function not implemented.')
}

