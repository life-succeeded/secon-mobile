import useAxios from '../../lib/hooks/useAxios'
import { ITask } from '../api.types'

const useGetTaskById = (params: { id: string }) => {
    const { id } = params

    return useAxios<ITask>(`/tasks/${id}`, 'get', true)
}

export default useGetTaskById
