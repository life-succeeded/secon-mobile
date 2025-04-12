export interface IInspector {
    surname: string
    name: string
    patronymic: string
}

export interface IBrigadeCreate {
    first_inspector: IInspector
    second_inspector: IInspector
}

export interface IBrigadeUpdate extends Partial<IBrigadeCreate> {}

export interface IBrigade {
    id: string
    first_inspector: IInspector
    second_inspector: IInspector
    created_at: string
}

export const InspectorTostring = (inspector: IInspector) =>
    `${inspector.name} ${inspector.surname} ${inspector.patronymic}`

export interface IConsumer {
    surname: string
    name: string
    patronymic: string
    phone_number: string
}

export type TTaskStatus = 0 | 1 | 2

export interface ITask {
    id: string
    brigade_id: string
    address: string
    visit_date: string
    status: TTaskStatus
    consumer: IConsumer
    account_number: number
    comment: string
    created_at: string
    updated_at: string
}

export interface ITaskCreate extends Omit<ITask, 'id'> {}

export interface ITaskUpdateStatus {
    new_status: TTaskStatus
}
