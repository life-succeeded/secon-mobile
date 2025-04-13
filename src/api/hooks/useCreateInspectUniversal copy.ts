import useAxios from '../../lib/hooks/useAxios'
import {
    ICreateInspectControl,
    ICreateInspectUniversal,
    IInspection,
    ITask,
    ITaskCreate,
} from '../api.types'

const useCreateInspectControl = (params: { data: ICreateInspectControl }) => {
    const { data } = params

    return useAxios<IInspection, ICreateInspectControl>(`/inspect/`, 'post', false, data)
}

export default useCreateInspectControl
