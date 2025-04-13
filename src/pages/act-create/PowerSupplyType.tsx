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

const PowerSupplyType = ({ defaultAccount, renderBelow }: Props) => {
    const dispatch = useDispatch()
    const savedAccount = useSelector(
        (state: RootState) => state.navigation.formSteps.formState['powerSupplyType'],
    )

    const fm = useFormContext()

    useEffect(() => {
        if (defaultAccount || savedAccount) {
            fm.reset({ powerSupplyType: defaultAccount || savedAccount || '' })
        }
    }, [defaultAccount, savedAccount])

    const handleNext = async () => {
        const isValid = await fm.trigger()
        if (isValid) {
            dispatch(updateFormState({ powerSupplyType: fm.getValues().account }))
            dispatch(nextFormStep())
        }
    }

    return (
        <div className="relative flex h-full flex-col px-5 pt-25">
            <div className="text-14-20-regular flex w-full flex-col gap-3">
                <p>Тип счётчика</p>
                <Input name="powerSupplyType" label="Тип" placeholder="Введите тип счётчика" />
            </div>

            {renderBelow && <div className="mt-8">{renderBelow}</div>}
            <Button className="w-full" type="button" onClick={handleNext}>
                Продолжить
            </Button>
        </div>
    )
}

export default PowerSupplyType
