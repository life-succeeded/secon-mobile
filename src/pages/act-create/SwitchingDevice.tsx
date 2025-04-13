import { useDispatch } from 'react-redux'
import { nextFormStep } from '../../store/navigationSlice'
import { Button } from '../../components/ui/button'
import Radio from '../../components/ui/radio'
import { fp } from '../../lib/fp'
import { useFormContext } from 'react-hook-form'

function SwitchingDevice() {
    const dispatch = useDispatch()
    const { formState, watch, setError } = useFormContext();

    const hasApparat = watch('hasApparat');

    const handleNext = () => {
        if (!hasApparat) {
            setError('hasApparat', { type: 'error', message: 'Выберите, имеется ли аппарат?' })
            return
        }
        dispatch(nextFormStep())
    }

    return (
        <div className="flex flex-col gap-5 p-5">
            <div className="mx-5flex-grow overflow-auto">
                <div className="flex w-full flex-col justify-center gap-5">
                    <div className="flex w-full flex-col justify-center gap-4 ">
                        <label className="text-14-20-regular">Коммутационный (вводной) аппарат:</label>
                        <div className="flex flex-col gap-2">
                            <Radio label="Имеется" name="hasApparat" value='1' />
                            <Radio label="Отсутствует" name="hasApparat" value='2' />
                        </div>
                        <div className="text-12-16-medium text-red-500">
                            {fp.getOr('', `errors.hasApparat.message`, formState)}
                            {fp.has(`errors.hasApparat.message`, formState)}
                        </div>
                    </div>

                    <Button onClick={() => handleNext()} type='button' className=' mt-65'>
                        Продолжить
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SwitchingDevice
