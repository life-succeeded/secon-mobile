import { useDispatch, useSelector } from 'react-redux'
import { nextFormStep, updateFormState } from '../../store/navigationSlice'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'
import { RootState } from '../../store/store'

type Props = {
    defaultAccount?: string
    renderBelow?: React.ReactNode
}

const PersonalAccount = ({ defaultAccount, renderBelow }: Props) => {
    const dispatch = useDispatch()
    const savedAccount = useSelector(
        (state: RootState) => state.navigation.formSteps.formState.accountNumber,
    )

    const fm = useFormContext()

    const handleNext = async () => {
        const isValid = await fm.trigger()
        if (isValid) {
            dispatch(updateFormState({ accountNumber: fm.getValues().account }))
            dispatch(nextFormStep())
        }
    }

    return (
        <div>
            <div className="relative flex h-full flex-col px-5 pt-25">
                <div className="flex w-full flex-col gap-3">
                    <Input name="account" label="Лицевой счёт" placeholder="Введите лицевой счёт" />
                </div>
                <Button className="w-full" type="button" onClick={handleNext}>
                    Продолжить
                </Button>
            </div>
        </div>
    )
}

export default PersonalAccount
