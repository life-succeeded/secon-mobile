import { renderIcon } from '../../icons/helpers'
import { Button } from '../../ui/button'

export const LogoutButton = () => {
    return (
        <>
            <Button variant="transparent">{renderIcon('exit', { fill: 'black' })}</Button>
        </>
    )
}
