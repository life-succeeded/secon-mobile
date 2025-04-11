import { renderIcon } from '../../icons/helpers'
import { Button } from '../../ui/button'

export const BackButton = () => {
    return (
        <>
            <Button variant="transparent">{renderIcon('arrow', { fill: 'black' })}</Button>
        </>
    )
}
