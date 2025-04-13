import useAxios from '../../lib/hooks/useAxios'
import { IBrigade, IReport } from '../api.types'

const useGetAllReports = () => {
    return useAxios<IReport[]>(`/analytics/reports`, 'get', true)
}

export default useGetAllReports
