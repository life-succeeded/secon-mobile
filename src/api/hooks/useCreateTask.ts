import useAxios from '../../lib/hooks/useAxios'
import useAxiosLazy from '../../lib/hooks/useAxiosLazy'
import { ITask, ITaskCreate } from '../api.types'

const useCreateTask = (params: { data: ITaskCreate }) => {
    const { data } = params

    return useAxios<ITask, ITaskCreate>(`/tasks/`, 'post', false, data)
}

export const useCreateTaskLazy = () => {
    return useAxiosLazy<ITask, ITaskCreate>(`/tasks/`, 'post', false)
}

export default useCreateTask
