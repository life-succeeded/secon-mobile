import InteractiveMap from '../components/core/map'
import { Navbar } from '../components/ui/navbar'

function Tasks() {
    return (
        <>
            <div className="flex h-screen flex-col">
                <span className="text-12-20-medium">карта</span>
                <InteractiveMap
                    enableAddressSearch={true}
                    enableRouting={true}
                    className="h-[600px] rounded-lg border"
                />
            </div>
        </>
    )
}

export default Tasks
