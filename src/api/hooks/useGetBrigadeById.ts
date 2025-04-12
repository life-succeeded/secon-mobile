import useAxios from '../../lib/hooks/useAxios'
import { IBrigade, ITask } from '../api.types'

const useGetBrigadeById = (params: { id: string }) => {
    const { id } = params

    return useAxios<IBrigade>(`/brigades/${id}`, 'get', true)
}

export default useGetBrigadeById
