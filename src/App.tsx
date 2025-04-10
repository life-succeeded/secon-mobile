import { Button } from './components/ui/button'
import { Input } from './components/ui/input'

function App() {
    return (
        <>
            <div className="flex w-[255px] flex-col gap-4">
                <Button icon="heart">Hello, world!</Button>
                <Input placeholder="hello mr penis"></Input>
            </div>
        </>
    )
}

export default App
