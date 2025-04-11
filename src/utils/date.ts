export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }

    const datePart = date.toLocaleDateString('ru-RU', options)
    const timePart = date.toLocaleTimeString('ru-RU', timeOptions)

    return `${datePart} ${timePart}`
}
