import { useDispatch, useSelector } from 'react-redux'
import { nextFormStep, updateFormState } from '../../store/navigationSlice'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { personalAccountResolver } from '../../lib/validators/act-create/personal-account-resolver'
import { useEffect } from 'react'
import { RootState } from '../../store/store'
import Radio from '../../components/ui/radio'
import { fp } from '../../lib/fp'

type Props = {
    defaultViolation?: string
}

const Place = ({ defaultViolation }: Props) => {
    const dispatch = useDispatch()
    const { watch, formState, setError } = useFormContext()

    const value = watch('violation')

    const handleNext = async () => {
        if (!value) {
            setError('violation', { type: 'error', message: 'Выберите тип' })
            return
        }

        console.log(value)

        dispatch(nextFormStep())
    }

    return (
        <div className="relative flex h-full flex-col px-5 pt-25">
            <div className="flex w-full flex-col justify-center gap-4">
                <label className="text-14-20-regular">
                    Нарушение потребителем введенного ограничения:
                </label>

                <Radio name="violation" value="1" label="Не выявлено" />
                <Radio name="violation" value="2" label="Выявлено" />
            </div>

            <div className="text-12-16-medium text-red-500">
                {fp.getOr('', `errors.violation.message`, formState)}
                {fp.has(`errors.violation.message`, formState)}
            </div>

            <Button className="w-full" type="button" onClick={handleNext}>
                Продолжить
            </Button>
        </div>
    )
}

export default Place
