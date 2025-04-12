import useAxios from '../../lib/hooks/useAxios'
import { IBrigade, ITask } from '../api.types'

const useGetBrigadeById = (params: { id: string }, autoExecute = true) => {
    const { id } = params

    return useAxios<IBrigade>(`/brigades/${id}`, 'get', autoExecute)
}

export default useGetBrigadeById
