import { NavbarItem } from '../navbar-item'

export const Navbar = () => {
    return (
        <>
            <nav className="mx-4 p-4">
                <ul className="flex flex-row justify-between space-x-4 select-none">
                    <NavbarItem state="active" text="Задачи" icon="task" />
                    <NavbarItem state="inactive" text="Карта" icon="map" />
                    <NavbarItem state="inactive" text="Добавить" icon="plus" />
                    <NavbarItem state="inactive" text="Акты" icon="fileBlank" />
                    <NavbarItem state="inactive" text="Отчёт" icon="file" />
                </ul>
            </nav>
        </>
    )
}
