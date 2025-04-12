import useAxios from '../../lib/hooks/useAxios'
import { ITask } from '../api.types'

const useGetTasks = (params: { brigadeId: string }) => {
    const { brigadeId } = params

    return useAxios<ITask[]>(`/tasks/by-brigade-id/${brigadeId}`, 'get')
}

export default useGetTasks
