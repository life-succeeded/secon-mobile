import { AppRoutes } from './lib/routes'
import { NavigationTracker } from './lib/NavigationTracker'

function App() {
    return (
        <>
            <AppRoutes />
            <NavigationTracker />
        </>
    )
}

export default App
