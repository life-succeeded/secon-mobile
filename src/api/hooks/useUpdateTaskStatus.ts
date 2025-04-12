import useAxios from '../../lib/hooks/useAxios'
import { ITask, ITaskUpdateStatus, TTaskStatus } from '../api.types'

const useUpdateTaskStatus = (params: { id: string; status: TTaskStatus }) => {
    const { id, status } = params

    return useAxios<ITask, ITaskUpdateStatus>(`/tasks/${id}/status`, 'patch', false, {
        new_status: status,
    })
}

export default useUpdateTaskStatus
