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

export interface IFile {
    name: string
    url: string
}

export interface IReport {
    id: string
    type: 0
    file: IFile
    for_date: string
    created_at: string
}

/*[
    {
        "id": "67faf4757cc23443fe93fdb4",
        "type": 0,
        "file": {
            "name": "Отчет за 13.04.2025.xlsx",
            "url": "https://tns.quassbot.ru/storage/documents/Отчет за 13.04.2025.xlsx"
        },
        "for_date": "2025-04-13T00:00:00Z",
        "created_at": "2025-04-12T23:17:09.217Z"
    }
]
*/
