import { useSelector } from 'react-redux';
import ContactInfo from './act-create/ContactInfo';
import { RootState } from '../store/store';
import ActType from './act-create/ActType';
import SwitchingDevice from './act-create/SwitchingDevice';

function ActCreate() {
    const { currentStep } = useSelector((state: RootState) => state.navigation.formSteps)

    return (
        <div className="flex flex-col h-[80vh]"> 
            <div className="flex-grow overflow-auto">
                {currentStep === 1 && <ContactInfo />}
                {currentStep === 2 && <ActType />}
                {currentStep === 3 && <SwitchingDevice />}
                {currentStep === 4 && <ActType />}
            </div>
        </div>
    )
}


export default ActCreate;