import useAxios from '../../lib/hooks/useAxios'
import { IBrigade, IBrigadeCreate, IBrigadeUpdate } from '../api.types'

const useCreateBrigade = (params: { data: IBrigadeCreate }) => {
    const { id, data } = params

    return useAxios<IBrigade, IBrigadeUpdate>(`/brigades/`, 'post', false, data)
}

export default useCreateBrigade
