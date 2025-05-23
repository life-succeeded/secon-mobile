import { useDispatch, useSelector } from 'react-redux'
import { nextFormStep, updateFormState } from '../../store/navigationSlice'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { personalAccountResolver } from '../../lib/validators/act-create/personal-account-resolver'
import { useEffect } from 'react'
import { RootState } from '../../store/store'

type Props = {
    defaultAccount?: string
    renderBelow?: React.ReactNode
}

const DeviceValue = ({ defaultAccount, renderBelow }: Props) => {
    const dispatch = useDispatch()
    const savedAccount = useSelector(
        (state: RootState) => state.navigation.formSteps.formState['deviceValue'],
    )

    const fm = useFormContext()

    // useEffect(() => {
    //     if (defaultAccount || savedAccount) {
    //         fm.reset({ deviceValue: defaultAccount || savedAccount || '' })
    //     }
    // }, [defaultAccount, savedAccount])

    const handleNext = async () => {
        const isValid = await fm.trigger()
        if (isValid) {
            dispatch(updateFormState({ deviceValue: fm.getValues().deviceValue }))
            dispatch(nextFormStep())
        }
    }

    return (
        <div className="relative flex h-full flex-col px-5 pt-25">
            <div className="text-14-20-regular flex w-full flex-col gap-3">
                <p>Показания прибора учета на момент проведения работ:</p>
                <Input name="deviceValue" label="Показания" placeholder="Введите показание" />
            </div>

            {renderBelow && <div className="mt-8">{renderBelow}</div>}
            <Button className="w-full" type="button" onClick={handleNext}>
                Продолжить
            </Button>
        </div>
    )
}

export default DeviceValue
