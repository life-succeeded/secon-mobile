import { AppRoutes } from './lib/routes'
import { NavigationTracker } from './lib/NavigationTracker'
import { Toaster } from 'react-hot-toast'

function App() {
    return (
        <>
            <Toaster />
            <AppRoutes />
            <NavigationTracker />
        </>
    )
}

export default App
