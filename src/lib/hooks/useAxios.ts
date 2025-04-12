import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { Config } from '../../utils/config'

const instance = axios.create({
    baseURL: Config.apiEndpoint,
})

type THttpMethod = 'post' | 'put' | 'delete' | 'patch' | 'get'

const useAxios = <TResponse, TBody = undefined>(
    route: string,
    method: THttpMethod,
    autoExecute = true,
    initialBody?: TBody,
) => {
    const [data, setData] = useState<TResponse | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState(true)

    const execute = useCallback(
        async (body?: TBody) => {
            setLoading(true)
            setError(null)

            try {
                if (method === 'get' || method === 'delete') {
                    const response = await instance[method](route)
                    setData(response.data)
                } else {
                    const requestBody = body ?? initialBody
                    if (requestBody === undefined) {
                        throw new Error('Request body is required for this method.')
                    }
                    const response = await instance[method](route, requestBody)
                    setData(response.data)
                }
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        },
        [route, method, initialBody],
    )

    useEffect(() => {
        if (autoExecute) {
            if (method === 'get' || method === 'delete') {
                execute()
            } else if (initialBody !== undefined) {
                execute(initialBody)
            }
        }
    }, [execute, autoExecute, method, initialBody])

    return { execute, data, error, isLoading: loading }
}

export default useAxios
