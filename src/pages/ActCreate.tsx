import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import ActType from './act-create/ActType'
import SwitchingDevice from './act-create/SwitchingDevice'
import UploadPhoto from './act-create/UploadPhoto'
import ContactInfo from './act-create/ContactInfo'
import { FormProvider, useForm } from 'react-hook-form'
import { PhotoData } from '../lib/hooks/useMultiCamera'
import PowerSuply from './act-create/power-suply'
import { nextFormStep, setFormStep } from '../store/navigationSlice'
import PersonalAccount from './act-create/PersonalAccount'
import Place from './act-create/Place'
import PowerSupplyType from './act-create/PowerSupplyType'
import DeviceValue from './act-create/DeviceValue'
import Way from './act-create/way'
import GenerateAct from './act-create/GenerateAct'
import ReasonMb from './act-create/Reason'
import useCreateTask from '../api/hooks/useCreateTask'
import { yupResolver } from '@hookform/resolvers/yup'
import { formDataResolver } from '../lib/validators/formData'

export type TFormData = {
    sealPlace: string
    sealNumber: string
    phoneNumber: string
    violationDisruption: string

    account: string
    address: string
    number: string
    fullName: string
    noAccess: boolean
    actType: string
    hasApparat: string

    originalFile: PhotoData
    counterValue: PhotoData

    // 8
    pullElectro: string
    timeToOff: string
    dateToOff: string
    violation: string
    powerSupplyType: string
    deviceValue: string

    // 9
    pullElectroAuthor: string
    duration: string

    // any
    counterNumberNew: string;

    reasonType: string;
    reasonMb: string;

}

function ActCreate() {
    const fm = useForm<TFormData>({
        // resolver: yupResolver(formDataResolver)
    })

    const { currentStep } = useSelector((state: RootState) => state.navigation.formSteps)
    console.log('📍 [ActCreate] Текущий шаг из Redux:', currentStep)

    const renderPageState = () => {
        switch (currentStep) {
            case 1:
                return <PersonalAccount />
            case 2:
                return <ContactInfo />
            case 3:
                return <DeviceValue />
            case 4:
                return <UploadPhoto />
            case 5:
                return <ActType />
            // case 5:
            //     return <SwitchingDevice />
            case 6:
                return <Place />
            case 7:
                return <PowerSupplyType />
            case 8: 
                return <ReasonMb />
            case 9:
                return <PowerSuply />
            case 10:
                return <Way />

            case 11:
                return <GenerateAct />
            default:
                return null
        }
    }

    return (
        <div className="flex h-[80vh] flex-col">
            <FormProvider {...fm}>
                <form>{renderPageState()}</form>
            </FormProvider>
        </div>
    )
}

export default ActCreate
