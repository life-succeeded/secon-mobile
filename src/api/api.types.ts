export interface IInspector {
    surname: string
    name: string
    patronymic: string
}

export interface IBrigadeCreate {
    first_inspector: IInspector
    second_inspector: IInspector
}

export interface IBrigade {
    id: string
    first_inspector: IInspector
    second_inspector: IInspector
    created_at: string
}
