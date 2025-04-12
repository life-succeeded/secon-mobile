import useAxios from '../../lib/hooks/useAxios'
import { ITask, ITaskCreate } from '../api.types'

const useCreateTask = (params: { data: ITaskCreate }) => {
    const { data } = params

    return useAxios<ITask, ITaskCreate>(`/tasks/`, 'post', false, data)
}

export default useCreateTask
