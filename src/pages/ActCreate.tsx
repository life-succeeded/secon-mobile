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
import DisconnectionReason from './act-create/DisconnectionReason'
import Violation from './act-create/ViolationDescription'

export type TFormData = {
    sealPlace: string
    sealNumber: string
    phoneNumber: string
    violationDisruption: string
    consumption: string

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
    counterNumberNew: string

    reasonType: string
    reasonMb: string
}

function ActCreate() {
    const fm = useForm<FormData>()
    const { currentStep, actType, violation } = useSelector(
        (state: RootState) => state.navigation.formSteps,
    )

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
            case 5:
                return <SwitchingDevice />
            case 6:
                switch (actType) {
                    case 'restriction':
                        return <DisconnectionReason />
                    case 'resumption':
                        return <PowerSuply />
                    case 'inspection':
                        return <DisconnectionReason />
                    case 'unauthorized':
                        return <DisconnectionReason />
                    default:
                        return null
                }
            case 7:
                switch (actType) {
                    case 'restriction':
                        return <PowerSuply />
                    case 'resumption':
                        return <Way />
                    case 'inspection':
                        return <PowerSuply />
                    case 'unauthorized':
                        return <PowerSuply />
                    default:
                        return null
                }
            case 8:
                switch (actType) {
                    case 'restriction':
                        return <Way />
                    case 'resumption':
                        return <Place />
                    case 'inspection':
                        return <Way />
                    case 'unauthorized':
                        return <Violation />
                    default:
                        return null
                }
            case 9:
                switch (actType) {
                    case 'restriction':
                        return <Place />
                    case 'resumption':
                        return <PowerSuply />
                    case 'inspection':
                        return <Violation />
                    case 'unauthorized':
                        switch (violation) {
                            case '1':
                                return <Way />
                            case '2':
                                return <PowerSuply />
                            default:
                                return null
                        }
                    default:
                        return null
                }
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
