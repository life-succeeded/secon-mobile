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
import ExampleComponent from './components/ui/test'

function App() {
    return (
        <>
            <div className="flex h-screen flex-col">
                <Header />
                <div className="flex-grow overflow-auto">
                    <div className="flex w-[255px] flex-col gap-4">
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
                    </div>
                </div>
                <Navbar />
            </div>
        </>
    )
}

export default App
