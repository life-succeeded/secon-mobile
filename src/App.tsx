import { Button } from './components/ui/button'
import Checkbox from './components/ui/checkbox'
import { Input } from './components/ui/input'

function App() {
    return (
        <>
            <div className="flex w-[255px] flex-col gap-4">
                <Button icon="heart">Hello, world!</Button>
                <Input placeholder="hello mr penis"></Input>
                <Checkbox label="test" isChecked={false} onChange={() => {}} />
            </div>
        </>
    )
}

export default App
