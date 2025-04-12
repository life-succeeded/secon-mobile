import useAxios from '../../lib/hooks/useAxios'
import { IBrigade, ITask } from '../api.types'

const useGetAllBrigades = () => {
    return useAxios<IBrigade[]>(`/brigades/`, 'get', true)
}

export default useGetAllBrigades
