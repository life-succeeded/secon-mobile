import { Agents } from '../components/core/agents'
import { TaskFeed } from '../components/core/task-feed'
import { Navbar } from '../components/ui/navbar'
import Test from './Test'

function Tasks() {
    return (
        <>
            <div className="flex h-screen flex-col">
                <Agents
                    agents={[
                        { name: 'Артём', surname: 'Пресняков', patronymic: 'Дмитриевич' },
                        { name: 'Артём', surname: 'Пресняков', patronymic: 'Дмитриевич' },
                    ]}
                />
                <TaskFeed />
            </div>
        </>
    )
}

export default Tasks
