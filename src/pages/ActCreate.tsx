import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import WizardParser from './act-create/WizardParser'
import ActType from './act-create/ActType'
import SwitchingDevice from './act-create/SwitchingDevice'
import UploadPhoto from './act-create/UploadPhoto'
import Violation from './act-create/Violation'
import ViolationDescription from './act-create/ViolationDescription'
import { useCallback, useRef, useState } from 'react'
import ContextLayout from './act-create/ctx/contextLayout'
import { ActCreateContext, ContextModel } from './act-create/ctx/ctx'
import ContactInfo from './act-create/ContactInfo'
import { FormProvider, useForm } from 'react-hook-form'

type FormData = {
    address: string
    number: string
    fullName: string
    noAccess: boolean
    actType: string
    hasApparat: string
}

function ActCreate() {
    const fm = useForm<FormData>()

    const { currentStep } = useSelector((state: RootState) => state.navigation.formSteps)

    const renderPageState = () => {
        switch (currentStep) {
            case 1:
                return <ContactInfo />
            case 2:
                return <UploadPhoto />
            case 3:
                return <ActType />
            case 4:
                return <SwitchingDevice />
            case 5:
                return <ActType />
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
