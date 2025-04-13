import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import ActType from './act-create/ActType'
import SwitchingDevice from './act-create/SwitchingDevice'
import UploadPhoto from './act-create/UploadPhoto'
import ContactInfo from './act-create/ContactInfo'
import { FormProvider, useForm } from 'react-hook-form'
import { PhotoData } from '../lib/hooks/useMultiCamera'
import PowerSuply from './act-create/power-suply'
import { setFormStep } from '../store/navigationSlice'
import PersonalAccount from './act-create/PersonalAccount'
import Place from './act-create/Place'
import PowerSupplyType from './act-create/PowerSupplyType'
import DeviceValue from './act-create/DeviceValue'
import GenerateAct from './act-create/GenerateAct'

export type TFormData = {
    account: string
    address: string
    number: string
    phoneNumber: string
    fullName: string
    noAccess: boolean
    actType: string
    hasApparat: string
    violation: string
    powerSupplyType: string
    deviceValue: string
    sealPlace: string
    sealNumber: string
}

function ActCreate() {
    const fm = useForm<TFormData>()

    const { currentStep } = useSelector((state: RootState) => state.navigation.formSteps)
    console.log('📍 [ActCreate] Текущий шаг из Redux:', currentStep)

    const renderPageState = () => {
        switch (currentStep) {
            case 1:
                return <PersonalAccount />
            case 2:
                return <ContactInfo />
            case 3:
                return <UploadPhoto />
            case 4:
                return <ActType />
            // case 5:
            //     return <SwitchingDevice />
            case 5:
                return <Place />
            case 6:
                return <PowerSupplyType />
            case 7:
                return <DeviceValue />
            case 8:
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
