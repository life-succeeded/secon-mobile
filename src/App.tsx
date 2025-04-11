import { BrowserRouter } from 'react-router'
import { AppRoutes } from './lib/routes'
import { Header } from './components/ui/header'
import { Navbar } from './components/ui/navbar'

function App() {
    return (
        <div className="flex h-screen flex-col">
            <Header />

            <main className="flex-1 overflow-auto">
                <AppRoutes />
            </main>

            <Navbar />
        </div>
    )
}

export default App
