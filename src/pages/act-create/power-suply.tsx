import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '../../store/store'
import { nextFormStep, setFormStep } from '../../store/navigationSlice'
import { Button } from '../../components/ui/button'
import Radio from '../../components/ui/radio'
import { useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { fp } from '../../lib/fp'
import { Input } from '../../components/ui/input'

function PowerSuply() {
    const dispatch = useDispatch()

    const { watch, setError, formState, getValues } = useFormContext();
    const actType = watch('pullElectro')

    const handleNext = () => {
        console.log(getValues())
        if (!actType) {
            setError('pullElectro', { type: 'error', message: 'Ввдеите данные' })
            return
        }
        dispatch(nextFormStep())
    }

    return (
        <div className="flex flex-col h-full relative px-5 pt-25">
            <div className="flex flex-col gap-4 overflow-auto">
                <label className="text-14-20-regular">Подача электроэнергии</label>
                <Radio label="Ограничена" name="pullElectro" value='1' />
                <Radio label="Приостановлена" name="pullElectro" value='2' />
                <Input name={'timeToOff'} label='Время' placeholder='ЧЧ:ММ' />
                <Input name={'dateToOff'} label='Дата' placeholder='ЧЧ.ММ.ГГГГ' />
            </div>

            <div className="absolute top-130 left-5 right-5">
                <Button className="w-full" type='button' onClick={() => handleNext()}>
                    Продолжить
                </Button>
            </div>

            <div className="text-12-16-medium text-red-500">
                {fp.getOr('', `errors.pullElectro.message`, formState)}
                {fp.has(`errors.pullElectro.message`, formState)}
            </div>
        </div>
    )
}

export default PowerSuply