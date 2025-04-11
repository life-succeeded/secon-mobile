import { Config } from '../utils/config'
import axios, { AxiosError } from 'axios'

const instance = axios.create({
    baseURL: Config.apiEndpoint,
})

export const createBrigade = async (item: TSpecialty) => {
    try {
        const { data, status } = await instance.post<ApiResponse<TSpecialty, ApiError>>(
            `specialities`,
            item,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        )

        return { success: data.success, status: status }
    } catch (err) {
        if (err instanceof AxiosError) {
            return { success: false, status: err.status }
        }

        return { success: false, status: 500 }
    }
}
