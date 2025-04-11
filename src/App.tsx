import { AppRoutes } from './lib/routes'
import { Header } from './components/ui/header'
import { Navbar } from './components/ui/navbar'
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
