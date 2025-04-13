import { Config } from '../utils/config'
import axios, { AxiosError } from 'axios'
import { IBrigade, IBrigadeCreate, ITask, ITaskCreate, ITaskUpdateStatus, TTaskStatus } from './api.types'
import { stat } from 'fs'

const instance = axios.create({
    baseURL: Config.apiEndpoint,
})

export const createBrigade = async (item: IBrigadeCreate) => {
    try {
        const brigade = await instance.post<IBrigade>(`brigades`, item)

        return brigade
    } catch (err) {
        console.error(err)

        return null
    }
}

export const getBrigadeById = async (id: string) => {
    try {
        const brigade = await instance.get<IBrigade>(`brigades/${id}`)

        return brigade
    } catch (err) {
        console.error(err)

        return null;
    }
}

export const getTasks = async (brigadeId: string) => {
    const result = await instance.get<Array<ITask>>(`/tasks/by-brigade-id/${brigadeId}`)

    return result
}

export const getTaskById = async (taskId: string) => {
    const result = await instance.get<ITask>(`/tasks/${taskId}`)

    return result
}

export const createTask = async (task: ITaskCreate) => {
    const result = await instance.post<ITask>(`/tasks`)

    return result
}

export const updateStatus = async (id: string, status: TTaskStatus) => {
    return await instance.patch<ITaskUpdateStatus>(`/tasks/${id}/status`, {
        status: status
    })
}