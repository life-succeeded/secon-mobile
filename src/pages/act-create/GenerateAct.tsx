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
import { IConsumer } from '../../api/api.types'
import { useAuth } from '../../lib/hooks/useAuth'

type Props = {
    defaultAccount?: string
    renderBelow?: React.ReactNode
}

const GenerateAct = ({ renderBelow }: Props) => {
    const dispatch = useDispatch()
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
                onClick={() => {
                    const values = fm.getValues() as TFormData
                    console.log(values)

                    const brigadeId = getAuthData().brigadeId

                    const consumer: IConsumer = {
                        ...parseFullName(values.fullName),
                        phone_number: values.phoneNumber,
                    }

                    const address = values.address
                    const value = Number(values.deviceValue)
                    const seals = [
                        {
                            number: values.sealNumber,
                            place: values.sealPlace,
                        },
                    ]
                }}
            >
                Сгенерировать акт
            </Button>
        </div>
    )
}

export default GenerateAct
