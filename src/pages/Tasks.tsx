import { Agents } from '../components/core/agents'
import { TaskFeed } from '../components/core/task-feed'
import { Navbar } from '../components/ui/navbar'
import { useAuth } from '../lib/hooks/useAuth'
import { parseFullName } from '../utils/strings'

function Tasks() {
    const { getAuthData, assertAuthenticated } = useAuth()

    assertAuthenticated()

    const agents = Object.entries(getAuthData()).map((fio) => parseFullName(fio[1]))

    return (
        <>
            <div className="flex h-screen flex-col">
                <Agents agents={agents} />
                <TaskFeed />
            </div>
        </>
    )
}

export default Tasks
