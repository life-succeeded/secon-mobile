import { renderIcon } from '../../icons/helpers'
import { NavbarItem } from '../navbar-item'

export const Navbar = () => {
    return (
        <>
            <nav className="p-4">
                <ul className="flex flex-row justify-between space-x-4">
                    <NavbarItem state="active" text="Задачи" icon="task" />
                    <NavbarItem state="inactive" text="Задачи" icon="task" />
                    <NavbarItem state="inactive" text="Задачи" icon="task" />
                    <NavbarItem state="inactive" text="Задачи" icon="task" />
                    <NavbarItem state="inactive" text="Задачи" icon="task" />
                </ul>
            </nav>
        </>
    )
}
