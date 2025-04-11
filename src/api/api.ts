import { Config } from '../utils/config'
import axios, { AxiosError } from 'axios'
import { IBrigade, IBrigadeCreate } from './api.types'

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
