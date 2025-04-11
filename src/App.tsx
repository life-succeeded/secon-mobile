import { HeartIcon } from './components/icons/bxHeart'
import { Button } from './components/ui/button'
import Card from './components/ui/card'
import Checkbox from './components/ui/checkbox'
import { Input } from './components/ui/input'
import Item from './components/ui/item'
import ExampleComponent from './components/ui/test'

function App() {
    return (
        <>
            <div className="flex w-[255px] flex-col gap-4">
                <Button icon="heart">Hello, world!</Button>
                <Input placeholder="hello mr human"></Input>
                <Checkbox label="test" checked={false} onChange={() => {}} />
                <ExampleComponent />
                <div className="flex flex-col space-y-4">
                    <Card title="Адрес">
                        <Item icon="heart" text="Hello, world!" />
                    </Card>
                </div>
            </div>
        </>
    )
}

export default App
