import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '../../store/store'
import { nextFormStep, setFormStep } from '../../store/navigationSlice'
import { Button } from '../../components/ui/button'
import Radio from '../../components/ui/radio'
import { useFormContext } from 'react-hook-form'
import { fp } from '../../lib/fp'
import { Input } from '../../components/ui/input'

function ReasonMb() {
    const dispatch = useDispatch()

    const { watch, setError, formState, getValues } = useFormContext();
    const actType = watch('reasonType')

    const handleNext = () => {
        console.log(getValues())
        if (!actType) {
            setError('reasonType', { type: 'error', message: 'Ввдеите данные' })
            return
        }
        dispatch(nextFormStep())
    }

    return (
        <div className="flex flex-col h-full relative px-5 pt-25">
            <div className="flex flex-col gap-4 overflow-auto">
                <label className="text-14-20-regular">Основание введения ограничения (приостановления) режима потребления: </label>
                <Radio label="Неполная оплата коммунальной услуги по электроснабжению" name="reasonType" value='1' />
                <Radio label="Иное" name="reasonType" value='2' />
                {actType && <Input name={'reasonMb'} placeholder='Введите причину' />}
            </div>

            <div>
                <Button className="w-full" type='button' onClick={() => handleNext()}>
                    Продолжить
                </Button>
            </div>

            <div className="text-12-16-medium text-red-500">
                {fp.getOr('', `errors.reasonType.message`, formState)}
                {fp.has(`errors.reasonType.message`, formState)}
            </div>
        </div>
    )
}

export default ReasonMb