import { useNavigate } from 'react-router'
import { renderIcon } from '../../icons/helpers'
import { Button } from '../../ui/button'

export const LogoutButton = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        sessionStorage.removeItem('fio1')
        sessionStorage.removeItem('fio2')
        sessionStorage.removeItem('brigadeId')
        navigate('/login')
    }
    return (
        <>
            <Button variant="transparent" onClick={handleLogout}>
                {renderIcon('exit', { fill: 'black' })}
            </Button>
        </>
    )
}
