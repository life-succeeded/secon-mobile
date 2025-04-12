import useAxios from '../../lib/hooks/useAxios'
import { ITask } from '../api.types'

const useGetTasksByBrigadeId = (params: { brigadeId: string }) => {
    const { brigadeId } = params

    return useAxios<ITask[]>(`/tasks/by-brigade-id/${brigadeId}`, 'get', true)
}

export default useGetTasksByBrigadeId
