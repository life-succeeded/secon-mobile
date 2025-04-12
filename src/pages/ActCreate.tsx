import { useSelector } from 'react-redux';
import ContactInfo from './act-create/ContactInfo';
import { RootState } from '../store/store';
import ActType from './act-create/ActType';

function ActCreate() {
    const { currentStep } = useSelector((state: RootState) => state.navigation.formSteps);
    
    return (
        <div className="form-container">
            {currentStep === 1 && <ContactInfo />}
            {currentStep === 2 && <ActType />}
            {currentStep === 3 && <ActType />}
            {currentStep === 4 && <ActType />}
        </div>
    )
}

export default ActCreate;