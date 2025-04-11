import { NavbarItem } from '../navbar-item'

export const Navbar = () => {
    return (
        <>
            <nav className="p-4">
                <ul className="flex flex-row justify-between space-x-4 select-none">
                    <NavbarItem state="active" text="Задачи" icon="task" />
                    <NavbarItem state="inactive" text="Карта" icon="map" />
                    <NavbarItem state="inactive" text="Задачи" icon="task" />
                    <NavbarItem state="inactive" text="Задачи" icon="task" />
                    <NavbarItem state="inactive" text="Задачи" icon="task" />
                </ul>
            </nav>
        </>
    )
}
