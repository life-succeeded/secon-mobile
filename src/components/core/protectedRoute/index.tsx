import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { TChildren } from '../../../utils/types'

export const ProtectedRoute = ({ children }: { children: TChildren }) => {
    const navigate = useNavigate()

    useEffect(() => {
        const fio1 = sessionStorage.getItem('fio1')
        const fio2 = sessionStorage.getItem('fio2')

        if (!fio1 || !fio2) {
            navigate('/login')
        }
    }, [navigate])

    return <>{children}</>
}
