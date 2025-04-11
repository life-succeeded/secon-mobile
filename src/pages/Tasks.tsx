import { Navbar } from '../components/ui/navbar'
import Test from './Test'

function Tasks() {
    return (
        <>
            <div className="flex h-screen flex-col">
                <span className="text-12-20-medium">задачи</span>

                <Test />
            </div>
        </>
    )
}

export default Tasks
