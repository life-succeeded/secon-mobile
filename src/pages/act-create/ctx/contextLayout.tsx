import React, { useCallback, useState } from 'react'
import { ActCreateContext, ContextModel } from './ctx'

export default function ContextLayout({ children }) {
    const [pageState, setPageState] = useState(0);
    const ctx: ContextModel = {
        pageState,
        setPageState: useCallback((value: number) => setPageState(value), []),
        previousPage: null
    }

    return (
        <ActCreateContext.Provider value={ctx}>
            {children}
        </ActCreateContext.Provider>
    )
}
