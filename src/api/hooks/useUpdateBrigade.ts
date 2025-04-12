import useAxios from '../../lib/hooks/useAxios'
import { IBrigade, IBrigadeUpdate } from '../api.types'

const useUpdateBrigade = (params: { id: string; data: IBrigadeUpdate }) => {
    const { id, data } = params

    return useAxios<IBrigade, IBrigadeUpdate>(`/brigades/${id}`, 'put', false, data)
}

export default useUpdateBrigade
