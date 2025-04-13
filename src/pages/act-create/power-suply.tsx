import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '../../store/store'
import { nextFormStep, setFormStep } from '../../store/navigationSlice'
import { Button } from '../../components/ui/button'
import Radio from '../../components/ui/radio'
import { useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { fp } from '../../lib/fp'

function PowerSuply() {
    const dispatch = useDispatch()

    const { watch, setError, formState } = useFormContext();
    const actType = watch('actType')

    const handleNext = () => {
        if (!actType) {
            setError('actType', { type: 'error', message: 'Выберите тип' })
            return
        }
        dispatch(setFormStep(9))
    }

    return (
        <div className="flex flex-col h-full relative px-5 pt-25">
            <div className="flex flex-col gap-4 overflow-auto">
                <label className="text-14-20-regular">Ак123т о:</label>
                <Radio label="О ВВЕДЕНИИ ОГРАНИЧЕНИЯ..." name="actType" value='1' />
                <Radio label="О ВОЗОБНОВЛЕНИИ..." name="actType" value='2' />
                <Radio label="ОСУЩЕСТВЛЕНИЯ ПРОВЕРКИ..." name="actType" value='3' />
                <Radio label="О САМОВОЛЬНОМ ПОДКЛЮЧЕНИИ..." name="actType" value='4' />
            </div>

            <div className="absolute top-130 left-5 right-5">
                <Button className="w-full" type='button' onClick={handleNext}>
                    Продолжить
                </Button>
            </div>

            <div className="text-12-16-medium text-red-500">
                {fp.getOr('', `errors.actType.message`, formState)}
                {fp.has(`errors.actType.message`, formState)}
            </div>
        </div>
    )
}

export default PowerSuply