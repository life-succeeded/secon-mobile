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

export interface IDevice {
    type: string
    number: number
    deployment_place: number
    other_place: string
    seals: [
        {
            number: number
            place: string
        },
    ]
    value: number
}

export interface IInspection {
    task_id: string
    brigade_id: string
    type: 0
    act_number: string
    resolution: number
    address: string
    consumer: IConsumer
    have_automaton: boolean
    account_number: string
    is_incomplete_payment: boolean
    other_reason: string
    method_by: number
    method: string
    device: IDevice
    reason_type: number
    reason: string
    act_copies: number
    images: IFile[]
    inspection_date: string
    resolution_file: IFile
}

export interface ICreateInspectUniversal {
    task_id: string
    brigade_id: string
    type: 0
    act_number: string
    resolution: number
    address: string
    consumer: IConsumer
    have_automaton: boolean
    account_number: string
    is_incomplete_payment: boolean
    other_reason: string
    method_by: number
    method: string
    device: IDevice
    reason_type: number
    reason: string
    act_copies: number
    images: IFile[]
}

export interface ICreateInspectControl {
    task_id: string
    brigade_id: string
    type: 0
    act_number: string
    resolution: number
    address: string
    consumer: IConsumer
    have_automaton: boolean
    account_number: string
    is_incomplete_payment: boolean
    other_reason: string
    method_by: number
    method: string
    device: IDevice
    reason_type: number
    reason: string
    act_copies: number
    images: IFile[]
    is_checked: boolean
    is_violation_detected: boolean
    is_expense_available: boolean
    other_violation: string
    is_unauthorized_consumers: boolean
    unauthorized_description: string
    old_device_value: number
    old_device_value_date: string
    unauthorized_explanation: string
    energy_action_date: string
}
