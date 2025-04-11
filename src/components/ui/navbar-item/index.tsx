import { tv } from 'tailwind-variants'
import { renderIcon } from '../../icons/helpers'
import { TIconVariant } from '../../icons/types'

const navbarItem = tv({
    base: 'flex flex-col items-center justify-center',
    variants: {
        color: {
            active: 'text-black-1',
            inactive: 'text-grey-3',
        },
    },
})

type TNavbarState = keyof typeof navbarItem.variants.color

interface INavbarItemProps {
    state: TNavbarState
    className?: string
    text: string
    icon: TIconVariant
}

export const NavbarItem = (props: INavbarItemProps) => {
    const fill = props.state === 'active' ? '#333' : '#8f8f8f' // black-1 or grey-3

    return (
        <>
            <li
                className={navbarItem({
                    color: props.state,
                    className: props.className,
                })}
            >
                {renderIcon(props.icon, { fill, height: 24 })}
                <span className="text-12-20-small">{props.text}</span>
            </li>
        </>
    )
}
