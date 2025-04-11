export function getFullName(params: { name: string; surname: string; patronymic: string }) {
    return `${params.surname} ${params.name} ${params.patronymic}`.trimEnd().trimStart()
}
