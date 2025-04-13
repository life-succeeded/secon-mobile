import useAxios from '../../lib/hooks/useAxios'
import { ICreateInspectUniversal, IInspection, ITask, ITaskCreate } from '../api.types'

const useCreateInspectUniversal = (params: { data: ICreateInspectUniversal }) => {
    const { data } = params

    return useAxios<IInspection, ICreateInspectUniversal>(`/inspect/`, 'post', false, data)
}

export default useCreateInspectUniversal
