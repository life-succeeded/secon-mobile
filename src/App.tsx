import { Act } from './components/core/act'
import { Task } from './components/core/task'
import { TaskFeed } from './components/core/task-feed'
import { HeartIcon } from './components/icons/bxHeart'
import { Alert } from './components/ui/alert'
import { Badge } from './components/ui/badge'
import { Button } from './components/ui/button'
import Card from './components/ui/card'
import Checkbox from './components/ui/checkbox'
import { Header } from './components/ui/header'
import { Input } from './components/ui/input'
import Item from './components/ui/item'
import { Navbar } from './components/ui/navbar'
import { ProgressBar } from './components/ui/progressbar'
import Radio from './components/ui/radio'
import { Tabs } from './components/ui/tabs'
import ExampleComponent from './components/ui/test'

function App() {
    const tabs = [
        {
            id: 'tab1',
            label: 'Вкладка 1',
            content: <div>Содержимое первой вкладки</div>,
        },
        {
            id: 'tab2',
            label: 'Вкладка 2',
            content: <div>Содержимое второй вкладки</div>,
        },
        {
            id: 'tab3',
            label: 'Вкладка 3',
            content: <div>Содержимое третьей вкладки</div>,
        },
    ]

    return (
        <>
            <div className="flex h-screen flex-col">
                <Header />
                <div className="flex-grow overflow-auto">
                    <div className="flex w-full flex-col gap-4">
                        <Button icon="heart">Hello, world!</Button>
                        <Input placeholder="hello mr human"></Input>
                        <Checkbox label="test" checked={false} onChange={() => {}} />
                        <ExampleComponent />
                        <ProgressBar value={2} />
                        <div className="flex flex-col space-y-4">
                            <Card title="Адрес">
                                <Item icon="fileBlank" text="Hello, world!" />
                            </Card>
                        </div>
                        <Badge variant="green" text="test" />
                        <Alert text="test" />
                        <Radio label="test" name="test" />
                        <Radio label="test" name="test" />
                        <Radio label="test" name="test" />

                        <Task address="улица Пушкина 1, д 1, кв 1" />

                        <Act
                            address="улица Пушкина 1"
                            imageName="Картинка.jpeg"
                            actName="Акт.pdf"
                        />

                        <TaskFeed />

                        <Tabs tabs={tabs} defaultTab={'tab2'} />
                    </div>
                </div>
                <Navbar />
            </div>
        </>
    )
}

export default App
