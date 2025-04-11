import { Config } from '../utils/config'
import axios, { AxiosError } from 'axios'
import { IBrigade, IBrigadeCreate, ITask } from './api.types'

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

export const getTasks = async (brigadeId: string) => {
    const result = await instance.get<Array<ITask>>(`/tasks/by-brigade-id/${brigadeId}`)

    return result
}

export const getTaskById = async (taskId: string) => {}
