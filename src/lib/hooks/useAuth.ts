import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export const useAuth = () => {
    const navigate = useNavigate()

    const getAuthData = () => {
        const brigadeId = sessionStorage.getItem('brigadeId')
        const fio1 = sessionStorage.getItem('fio1')
        const fio2 = sessionStorage.getItem('fio2')
        return { brigadeId, fio1, fio2 }
    }

    const isAuthenticated = () => {
        const { brigadeId } = getAuthData()
        return !!brigadeId
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
