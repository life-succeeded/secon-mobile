import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import WizardParser from './act-create/WizardParser'
import ActType from './act-create/ActType'
import SwitchingDevice from './act-create/SwitchingDevice'
import UploadPhoto from './act-create/UploadPhoto'
import Violation from './act-create/Violation'
import ViolationDescription from './act-create/ViolationDescription'

function ActCreate() {
    const { currentStep } = useSelector((state: RootState) => state.navigation.formSteps)

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
            <WizardParser wizard={wizard} />
            {/*<div className="flex-grow overflow-auto">*/}
            {/*    {currentStep === 1 && <ContactInfo />}*/}
            {/*    {currentStep === 2 && <UploadPhoto />}*/}
            {/*    {currentStep === 3 && <ActType />}*/}
            {/*    {currentStep === 4 && <SwitchingDevice />}*/}
            {/*    {currentStep === 5 && <ActType />}*/}
            {/*</div>*/}
            <div className="flex-grow overflow-auto"></div>
        </div>
    )
}

export default ActCreate
