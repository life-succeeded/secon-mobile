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
