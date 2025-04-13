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

const Consumption = ({ defaultAccount, renderBelow }: Props) => {
    const dispatch = useDispatch()

    const fm = useFormContext()

    const handleNext = async () => {
        const isValid = await fm.trigger()
        if (isValid) {
            dispatch(updateFormState({ consumption: fm.getValues().consumption }))
            dispatch(nextFormStep())
        }
    }

    return (
        <div className="relative flex h-full flex-col px-5 pt-25">
            <div className="flex w-full flex-col gap-3">
                <Input
                    name="consumption"
                    label="Расход электрической энергии кВтч"
                    placeholder="Расход"
                />
            </div>

            {renderBelow && <div className="mt-8">{renderBelow}</div>}
            <Button className="w-full" type="button" onClick={handleNext}>
                Продолжить
            </Button>
        </div>
    )
}

export default Consumption
