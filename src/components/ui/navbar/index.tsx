import { useLocation } from 'react-router'
import { NavbarItem } from '../navbar-item'
import { useEffect, useState } from 'react'
import { TIconVariant } from '../../icons/types'

export const Navbar = () => {
    const location = useLocation()
    const [activePath, setActivePath] = useState(location.pathname)

    useEffect(() => {
        setActivePath(location.pathname)
    }, [location.pathname])

    const navItems: Array<{ path: string; text: string; icon: TIconVariant }> = [
        { path: '/', text: 'Задачи', icon: 'task' },
        { path: '/map', text: 'Карта', icon: 'map' },
        { path: '/create', text: 'Добавить', icon: 'plus' },
        { path: '/acts', text: 'Акты', icon: 'fileBlank' },
        { path: '/report', text: 'Отчёт', icon: 'file' },
    ]

    return (
        <nav className="mx-4 p-4">
            <ul className="flex flex-row justify-between space-x-4 select-none">
                {navItems.map((item) => (
                    <NavbarItem
                        key={item.path}
                        isActive={activePath === item.path}
                        text={item.text}
                        icon={item.icon}
                        path={item.path}
                        onClick={() => setActivePath(item.path)}
                    />
                ))}
            </ul>
        </nav>
    )
}
