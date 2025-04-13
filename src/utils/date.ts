export function formatDate(dateString: string, dateOnly = false): string {
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

    return `${datePart} ${!dateOnly ? timePart : ''}`.trimEnd()
}

function parseDateFromDDMMYYYY(dateString: string): Date {
    const [day, month, year] = dateString.split('.').map(Number)

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        throw new Error('Invalid date format. Expected DD.MM.YYYY')
    }

    const date = new Date(year, month - 1, day)

    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
        throw new Error('Invalid date value')
    }

    return date
}
