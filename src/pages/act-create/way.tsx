import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '../../store/store'
import { nextFormStep, setFormStep } from '../../store/navigationSlice'
import { Button } from '../../components/ui/button'
import Radio from '../../components/ui/radio'
import { useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { fp } from '../../lib/fp'
import { Input } from '../../components/ui/input'

function Way() {
    const dispatch = useDispatch()

    const { watch, setError, formState, getValues } = useFormContext();
    const actType = watch('pullElectroAuthor')

    const handleNext = () => {
        console.log(getValues())
        if (!actType) {
            setError('pullElectroAuthor', { type: 'error', message: 'Ввдеите данные' })
            return
        }
        dispatch(nextFormStep())
    }

    return (
        <div className="flex flex-col h-full relative px-5 pt-25">
            <div className="flex flex-col gap-4 overflow-auto">
                <label className="text-14-20-regular">Подача электроэнергии ограничена/приостановлена:</label>
                <Radio label="Потребителем самостоятельно" name="pullElectroAuthor" value='1' />
                <Radio label="Исполнителем " name="pullElectroAuthor" value='2' />
                <Input name={'duration'} label='Путем' placeholder='Введите путь' />
            </div>

            <div className="absolute top-130 left-5 right-5">
                <Button className="w-full" type='button' onClick={() => handleNext()}>
                    Продолжить
                </Button>
            </div>

            <div className="text-12-16-medium text-red-500">
                {fp.getOr('', `errors.pullElectroAuthor.message`, formState)}
                {fp.has(`errors.pullElectroAuthor.message`, formState)}
            </div>
        </div>
    )
}

export default Way