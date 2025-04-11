import { useLocation } from 'react-router'

const routeTitles: Record<string, string> = {
    '/': 'Задачи',
    '/map': 'Карта',
    '/create': 'Акт',
    '/acts': 'Акты',
    '/report': 'Отчёт',
}

function extractAndValidateId(path: string): number | null {
    const match = path.match(/^\/acts\/(\d+)(?:\/|$)/)

    if (!match) {
        return null
    }

    const id = parseInt(match[1], 10)

    return isNaN(id) ? null : id
}

export const useRouteTitle = () => {
    const location = useLocation()

    if (extractAndValidateId(location.pathname)) {
        return 'Акт'
    }

    return routeTitles[location.pathname] || 'Заголовок'
}
