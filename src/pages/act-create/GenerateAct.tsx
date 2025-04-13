import { useDispatch, useSelector } from 'react-redux'
import { nextFormStep, updateFormState } from '../../store/navigationSlice'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { personalAccountResolver } from '../../lib/validators/act-create/personal-account-resolver'
import { useEffect } from 'react'
import { RootState } from '../../store/store'
import { TFormData } from '../ActCreate'
import { parseFullName } from '../../utils/strings'
import { IConsumer, IDevice } from '../../api/api.types'
import { useAuth } from '../../lib/hooks/useAuth'
import useCreateTask, { useCreateTaskLazy } from '../../api/hooks/useCreateTask'
import { createInspectUniversal, createTask } from '../../api/api'
import { useNavigate } from 'react-router'

type Props = {
    defaultAccount?: string
    renderBelow?: React.ReactNode
}

const GenerateAct = ({ renderBelow }: Props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const savedSealPlace = useSelector(
        (state: RootState) => state.navigation.formSteps.formState['sealPlace'],
    )
    const savedSealNumber = useSelector(
        (state: RootState) => state.navigation.formSteps.formState['sealNumber'],
    )
    const { getAuthData } = useAuth()

    const fm = useFormContext()

    // useEffect(() => {
    //     if (savedSealNumber || savedSealPlace) {
    //         fm.reset({ sealPlace: savedSealPlace || '' })
    //         fm.reset({ sealNumber: savedSealNumber || '' })
    //     }
    // }, [savedSealNumber, savedSealPlace])

    const handleNext = async () => {
        const isValid = await fm.trigger()
        if (isValid) {
            dispatch(updateFormState({ sealPlace: fm.getValues().sealPlace }))
            dispatch(updateFormState({ sealNumber: fm.getValues().sealNumber }))
        }
    }

    return (
        <div className="relative flex h-full flex-col px-5 pt-25">
            <div className="text-14-20-regular flex w-full flex-col gap-3">
                <p>
                    Наличие, номера пломб (знаков визуального контроля) на системе учета (указать
                    номер, место установки)
                </p>
                <Input name="sealNumber" label="Номер пломбы" placeholder="Введите показания" />
                <Input
                    name="sealPlace"
                    label="Место установки пломбы"
                    placeholder="Введите показания"
                />
            </div>

            {renderBelow && <div className="mt-8">{renderBelow}</div>}
            <Button
                variant="blue"
                icon="magic"
                className="w-full"
                type="button"
                onClick={async () => {
                    const values = fm.getValues() as TFormData
                    console.log(values)

                    const brigade_id = getAuthData().brigadeId
                    const address = values.address

                    const consumer: IConsumer = {
                        ...parseFullName(values.fullName),
                        phone_number: values.phoneNumber,
                    }

                    const account_number = values.account

                    const createdTask = await createTask({
                        brigade_id,
                        consumer,
                        address,
                        account_number,
                        comment: 'Test',
                        visit_date: new Date().toISOString(),
                    })

                    const task_id = createdTask.id

                    const device: IDevice = {
                        value: Number(values.deviceValue),
                        seals: [
                            {
                                number: values.sealNumber,
                                place: values.sealPlace,
                            },
                        ],
                        type: 'счётчик',
                        number: values.number,
                        deployment_place: 0,
                        other_place: 'other_place',
                    }

                    const createdInspection = await createInspectUniversal({
                        task_id,
                        brigade_id,
                        address,
                        consumer,
                        resolution: 0,
                        type: 0,
                        have_automaton: true,
                        account_number,
                        is_incomplete_payment: true,
                        other_reason: values?.reasonMb ?? '',
                        method_by: Number(values.pullElectroAuthor),
                        method: values.duration,
                        device,
                        reason_type: 0,
                        reason: 'пусть живет пока',
                        images: [{ name: 'фотка', url: 'ссылка на фотку' }],
                        energy_action_date: new Date().toISOString(),
                    })

                    navigate('/acts')
                }}
            >
                Сгенерировать акт
            </Button>
        </div>
    )
}

export default GenerateAct
