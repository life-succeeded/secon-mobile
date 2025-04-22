export function getFullName(params: { name: string; surname: string; patronymic: string }) {
    return `${params.surname} ${params.name} ${params.patronymic}`.trimEnd().trimStart()
}

export function parseFullName(fio: string) {
    if (!fio) {
        return { name: '', surname: '', patronymic: '' }
    }

    const parts = fio.split(' ')
    return {
        name: parts[1],
        surname: parts[0],
        patronymic: parts.length > 2 ? parts[2] : '',
    }
}

export function base64ToFile(base64: string, filename: string): File {
    if (!base64) {
        throw new Error('Base64 string is empty')
    }

    const parts = base64.split(';base64,')
    const mimeType = parts.length > 1 ? parts[0].split(':')[1] : 'image/jpeg'
    const base64Data = parts.length > 1 ? parts[1] : base64

    try {
        const byteString = atob(base64Data)
        const byteNumbers = new Array(byteString.length)
        for (let i = 0; i < byteString.length; i++) {
            byteNumbers[i] = byteString.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)

        return new File([byteArray], filename, { type: mimeType })
    } catch (e) {
        throw new Error('Failed to decode base64 string: ' + e.message)
    }
}