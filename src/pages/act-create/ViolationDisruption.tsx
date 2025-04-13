import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '../../store/store'
import { nextFormStep, setFormStep } from '../../store/navigationSlice'
import { Button } from '../../components/ui/button'
import Radio from '../../components/ui/radio'
import { useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { fp } from '../../lib/fp'
import { Input } from '../../components/ui/input'

function ViolationDisruption() {
    const dispatch = useDispatch()

    const { watch, setError, formState, getValues } = useFormContext()
    const actType = watch('violationDisruption')

    const handleNext = () => {
        console.log(getValues())
        if (!actType) {
            setError('violationDisruption', { type: 'error', message: 'Введите данные' })
            return
        }
        dispatch(nextFormStep())
    }

    return (
        <div className="relative flex h-full flex-col px-5 pt-25">
            <div className="flex flex-col gap-4 overflow-auto">
                <label className="text-14-20-regular">
                    Описание выявленного нарушения/сведения, на основании которых сделан вывод о
                    нарушении:
                </label>
                <Radio
                    label="Потребителем самостоятельно"
                    name="violationDisruption"
                    value="Потребителем самостоятельно"
                />
                <Radio label="Исполнителем " name="violationDisruption" value="Иное" />
            </div>

            <div className="absolute top-130 right-5 left-5">
                <Button className="w-full" type="button" onClick={() => handleNext()}>
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

export default ViolationDisruption
