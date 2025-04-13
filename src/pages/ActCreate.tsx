import { useDispatch, useSelector } from 'react-redux'
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
import { PhotoData } from '../lib/hooks/useMultiCamera'
import PowerSuply from './act-create/power-suply'
import { nextFormStep, setFormStep } from '../store/navigationSlice'
import PersonalAccount from './act-create/PersonalAccount'

type FormData = {
    account: string;
    address: string;
    number: string;
    fullName: string;
    noAccess: boolean;
    actType: string;
    hasApparat: string;

    originalFile: PhotoData;
    counterValue: PhotoData;
    
    // 9
    pullElectro: string
    timeToOff: string;
    dateToOff: string;
}

function ActCreate() {
    const fm = useForm<FormData>();

    const { currentStep } = useSelector((state: RootState) => state.navigation.formSteps)

    console.log('📍 [ActCreate] Текущий шаг из Redux:', currentStep);

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

            case 9:
                return <PowerSuply />
            default:
                return null;
        }
    }

    const wizard = [
        {
            id: 'step1',
            currentStep: 1,
            content: [
                {
                    type: 'checkbox',
                    title: 'Лицевой счет',
                    name: 'licevoy_schet',
                    value: false,
                    placeholder: 'Введите лицевой счет',
                    disabled: false,
                    required: false,
                },
            ],
        },
        {
            id: 'step2',
            currentStep: 2,
            content: [
                {
                    type: 'input',
                    title: 'Контактный номер',
                    name: 'contact_number',
                },
                {
                    type: 'input',
                    title: 'Потребитель',
                    name: 'potrebitel',
                },
                {
                    type: 'input',
                    title: 'ОБъект',
                    name: 'obyect',
                },
            ],
        },
        {
            id: 'step3',
            currentStep: 3,
            content: [
                {
                    type: 'fileInput',
                    title: 'Добавление фото счетчика до работы',
                    name: 'photo_schetchika_1',
                    cameraKey: 'counter',
                    placeholder: 'Добавить фото счетчика',
                },
                {
                    type: 'fileInput',
                    title: '',
                    name: 'photo_schetchika_2',
                    cameraKey: 'counter',
                    placeholder: 'Добавить фото счетчика',
                },
                {
                    type: 'checkbox',
                    name: 'net_dostupa',
                    cameraKey: 'counter',
                    title: 'Нет доступа к счетчику',
                },
            ],
        },
        {
            id: 'step4',
            currentStep: 4,
            content: [
                {
                    type: 'fileInput',
                    title: 'Добавление фото счетчика после работы',
                    placeholder: 'Добавить фото счетчика',
                },
                {
                    type: 'fileInput',
                    title: '',
                    placeholder: 'Добавить фото счетчика',
                },
            ],
        },
        {
            id: 'step5',
            currentStep: 5,
            title: 'Акт о:',
            content: [
                {
                    type: 'radio',
                    options: [
                        {
                            title: 'Радио 1',
                            value: 'value1',
                        },
                        {
                            title: 'Радио 2',
                            value: 'value2',
                        },
                        {
                            title: 'Радио 3',
                            value: 'value3',
                        },
                        {
                            title: 'Радио 4',
                            value: 'value4',
                        },
                    ],
                },
            ],
        },
    ]

    return (
        <div className="flex h-[80vh] flex-col">
            <FormProvider {...fm}>
                <form>
                    {renderPageState()}
                </form>
            </FormProvider>

            {/* <UploadPhoto /> */}
            {/* <WizardParser wizard={wizard} /> */}
            {/*<div className="flex-grow overflow-auto">*/}
            {/*    {currentStep === 1 && <ContactInfo />}*/}
            {/* {currentStep === 2 && <UploadPhoto />} */}
            {/*    {currentStep === 3 && <ActType />}*/}
            {/*    {currentStep === 4 && <SwitchingDevice />}*/}
            {/*    {currentStep === 5 && <ActType />}*/}
            {/*</div>*/}
            {/* <div className="flex-grow overflow-auto"></div> */}
        </div>
    )
}

export default ActCreate
