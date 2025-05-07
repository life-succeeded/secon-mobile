import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import ActType from './act-create/ActType'
import UploadPhoto from './act-create/UploadPhoto'
import ContactInfo from './act-create/ContactInfo'
import { FormProvider, useForm } from 'react-hook-form'
import { PhotoData } from '../lib/hooks/useMultiCamera'
import PowerSupply from './act-create/PowerSupply'
import PersonalAccount from './act-create/PersonalAccount'
import Place from './act-create/Place'
import PowerSupplyType from './act-create/PowerSupplyType'
import DeviceValue from './act-create/DeviceValue'
import GenerateAct from './act-create/GenerateAct'
import DisconnectionReason from './act-create/DisconnectionReason'
import Violation from './act-create/ViolationDescription'
import Way from './act-create/Way'

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

    originalCounterFile: PhotoData
    counterValue: PhotoData

    originalSealFile: PhotoData
    sealValue: PhotoData

    sealImage: { url: string; name: string }
    counterImage: { url: string; name: string }

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

    url: string
}

function ActCreate() {
    const { currentStep, actType, formState } = useSelector(
        (state: RootState) => state.navigation.formSteps,
    )

    const fm = useForm<TFormData>({
        defaultValues: {
            phoneNumber: formState.phoneNumber,
            address: formState.address,
            fullName: formState.consumer,
            account: formState.accountNumber,
        },
    })

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
                switch (actType) {
                    case 'restriction':
                        return <DisconnectionReason />
                    case 'resumption':
                        return <PowerSupply />
                    case 'inspection':
                        return <DisconnectionReason />
                    case 'unauthorized':
                        return <DisconnectionReason />
                    default:
                        return null
                }
            case 6:
                switch (actType) {
                    case 'restriction':
                        return <PowerSupply />
                    case 'resumption':
                        return <Way />
                    case 'inspection':
                        return <PowerSupply />
                    case 'unauthorized':
                        return <PowerSupply />
                    default:
                        return null
                }
            case 7:
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
            case 8:
                switch (actType) {
                    case 'restriction':
                        return <Place />
                    case 'resumption':
                        return <PowerSupply />
                    case 'inspection':
                        return <Violation />
                    case 'unauthorized':

                    default:
                        return null
                }
            case 9:
                switch (actType) {
                    case 'restriction':
                        return <PowerSupplyType />
                    case 'resumption':
                        return <Way />
                    case 'inspection':
                        return <Violation />
                    case 'unauthorized':

                    default:
                        return null
                }
            case 10:
                switch (actType) {
                    case 'restriction':
                        return <DeviceValue />
                    case 'resumption':
                        return <Place />
                    case 'inspection':
                        return <Violation />
                    case 'unauthorized':

                    default:
                        return null
                }
            case 11:
                switch (actType) {
                    case 'restriction':
                        return <GenerateAct />
                    case 'resumption':
                        return <PowerSupplyType />
                    case 'inspection':
                        return <Violation />
                    case 'unauthorized':

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
