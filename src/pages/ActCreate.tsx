import { useSelector } from 'react-redux'
import ContactInfo from './act-create/ContactInfo'
import { RootState } from '../store/store'
import ActType from './act-create/ActType'
import SwitchingDevice from './act-create/SwitchingDevice'
import UploadPhoto from './act-create/UploadPhoto'
import Violation from './act-create/Violation'
import ViolationDescription from './act-create/ViolationDescription'

function ActCreate() {
    const { currentStep } = useSelector((state: RootState) => state.navigation.formSteps)

    return (
        <div className="flex h-[80vh] flex-col">
            <div className="flex-grow overflow-auto">
                {currentStep === 1 && <ViolationDescription />}
                {currentStep === 2 && <UploadPhoto />}
                {currentStep === 3 && <ActType />}
                {currentStep === 4 && <SwitchingDevice />}
                {currentStep === 5 && <ActType />}
            </div>
        </div>
    )
}

export default ActCreate
