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
                    type: 'input',
                    title: 'Лицевой счет',
                    name: 'licevoy_schet',
                    placeholder: 'Введите лицевой счет',
                    disabled: false,
                    required: false,
                },
            ],
            next: 'step2',
        },
        {
            id: 'step2',
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
            next: 'step3',
        },
        {
            id: 'step3',
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
            next: 'step4',
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
            next: 'step5',
        },
        {
            id: 'step5',
            title: 'Акт о:',
            content: [
                {
                    type: 'radio',
                    name: 'asf',
                    options: [
                        {
                            title: 'О ВВЕДЕНИИ ОГРАНИЧЕНИЯ (ПРИОСТАНОВЛЕНИИ) КОММУНАЛЬНОЙ УСЛУГИ ПО ЭЛЕКТРОСНАБЖЕНИЮ',
                            value: '',
                        },
                        {
                            title: 'О ВОЗОБНОВЛЕНИИ ПРЕДОСТАВЛЕНИЯ КОММУНАЛЬНОЙ УСЛУГИ ПО ЭЛЕКТРОСНАБЖЕНИЮ',
                            value: '',
                        },
                        {
                            title: 'ОСУЩЕСТВЛЕНИЯ ПРОВЕРКИ ВВЕДЕННОГО ОГРАНИЧЕНИЯ РЕЖИМА ПОТРЕБЛЕНИЯ',
                            value: '',
                        },
                        {
                            title: 'О САМОВОЛЬНОМ ПОДКЛЮЧЕНИИ К ЭЛЕКТРИЧЕСКИМ СЕТЯМ',
                            value: '',
                        },
                    ],
                },
            ],
            next: (data: any) => {
                switch (data.actType) {
                    case 'value1':
                        return 'step6'
                    case 'value2':
                        return 'step7'
                    case 'value3':
                        return 'step8'
                    case 'value4':
                        return 'step9'
                    default:
                        return 'step6'
                }
            },
        },
        {
            id: 'step5-1',
            title: 'Коммутационный (вводной) аппарат:',
            content: [
                {
                    type: 'radio',
                    name: 'asf',
                    options: [
                        {
                            title: 'Имеется',
                            value: '',
                        },
                        {
                            title: 'Отсутствует',
                            value: '',
                        },
                    ],
                },
            ],
            next: 'step5-2',
        },
        {
            id: 'step5-2',
            title: 'Основание введения ограничения (приостановления) режима потребления: ',
            content: [
                {
                    type: 'radio',
                    name: 'asf',
                    options: [
                        {
                            title: 'Неполная оплата коммунальной услуги по электроснабжению',
                            value: '',
                        },
                        {
                            title: 'Иное',
                            value: '',
                        },
                    ],
                },
            ],
            next: 'step5-3',
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
