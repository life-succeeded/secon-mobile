// hooks/useAuth.ts
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export const useAuth = () => {
    const navigate = useNavigate()

    const getAuthData = () => {
        const fio1 = sessionStorage.getItem('fio1')
        const fio2 = sessionStorage.getItem('fio2')
        return { fio1, fio2 }
    }

    const isAuthenticated = () => {
        const { fio1, fio2 } = getAuthData()
        return !!fio1 && !!fio2
    }

    const assertAuthenticated = () => {
        if (!isAuthenticated()) {
            navigate('/login')
        }
    }

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login')
        }
    }, [navigate])

    return { getAuthData, isAuthenticated, assertAuthenticated }
}
