import useAxios from '../../lib/hooks/useAxios'
import { IBrigade, IInspection, ITask } from '../api.types'

const useGetInspectionsByBrigadeId = (params: { id: string }, autoExecute = true) => {
    const { id } = params

    return useAxios<IInspection[]>(`/inspections/by-brigade-id/${id}`, 'get', autoExecute)
}

export default useGetInspectionsByBrigadeId
