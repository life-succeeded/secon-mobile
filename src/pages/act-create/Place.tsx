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
    defaultPlace?: string
}

const Place = ({ defaultPlace }: Props) => {
    const dispatch = useDispatch()
    const { watch, formState, setError } = useFormContext()

    const value = watch('place')

    const handleNext = async () => {
        if (!value) {
            setError('place', { type: 'error', message: 'Выберите тип' })
            return
        }

        dispatch(nextFormStep())
    }

    return (
        <div className="relative flex h-full flex-col px-5 pt-25">
            <div className="flex w-full flex-col justify-center gap-4">
                <label className="text-14-20-regular">Место установки прибора учета:</label>

                <Radio name="place" value="В квартире" label="В квартире" />
                <Radio name="place" value="На лестничной площадке" label="На лестничной площадке" />
                <Radio name="place" value="Иное" label="Иное" />
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
