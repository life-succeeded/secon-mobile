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

export interface IConsumer {
    surname: string
    name: string
    patronymic: string
    phone_number: string
}

export interface ITask {
    id: string
    brigade_id: string
    address: string
    visit_date: string
    status: 0 | 1 | 2
    consumer: IConsumer
    account_number: number
    comment: string
    created_at: string
    updated_at: string
}

export interface ITaskCreate extends Omit<ITask, 'id'> {}
