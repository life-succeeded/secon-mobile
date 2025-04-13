import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { FormProvider, useForm } from 'react-hook-form';
import PersonalAccount from './act-create/PersonalAccount';
import ContactInfo from './act-create/ContactInfo';
import UploadPhoto from './act-create/UploadPhoto';
import ActType from './act-create/ActType';
import SwitchingDevice from './act-create/SwitchingDevice';
import Violation from './act-create/Violation';
import ViolationDescription from './act-create/ViolationDescription';

type FormData = {
  account: string;
  address: string;
  number: string;
  fullName: string;
  noAccess: boolean;
  actType: string;
  hasApparat: string;
};

function ActCreate() {
  const fm = useForm<FormData>();
  const { currentStep, actType } = useSelector((state: RootState) => state.navigation.formSteps);

  const renderPageState = () => {
    switch (currentStep) {
      case 1: return <PersonalAccount />;
      case 2: return <ContactInfo />;
      case 3: return <UploadPhoto />;
      case 4: return <ActType />;
      case 5: return <SwitchingDevice />;
      case 6:
        switch (actType) {
          case 'restriction':
            return <Violation />;
          case 'resumption':
            return <ViolationDescription />;
          case 'inspection':
            return <Violation />;
          case 'unauthorized':
            return <ViolationDescription />;
          default:
            return null;
        }
      default: return null;
    }
  };

  return (
    <div className="flex h-[80vh] flex-col">
      <FormProvider {...fm}>
        <form>
          {renderPageState()}
        </form>
      </FormProvider>
    </div>
  );
}

export default ActCreate;
