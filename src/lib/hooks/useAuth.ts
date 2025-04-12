import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export const useAuth = () => {
    const navigate = useNavigate()

    const getAuthData = () => {
        const brigadeId = sessionStorage.getItem('brigadeId')
        return { brigadeId }
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
