import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { updateFormState, nextFormStep } from '../../store/navigationSlice'
import { FormProvider, useForm } from 'react-hook-form'
import Radio from '../../components/ui/radio'
import { useState } from 'react'

function Violation() {
    const methods = useForm()
    const dispatch = useDispatch()
    const [selectedViolation, setSelectedViolation] = useState<string>('')
    const { formState, currentStep } = useSelector((state: RootState) => state.navigation.formSteps)

    const handleNext = () => {
        dispatch(nextFormStep())
    }

    return (
        <div className="relative flex h-full flex-col px-5 pt-25">
            <div className="mx-5flex-grow overflow-auto">
                <div className="flex w-full flex-col justify-center gap-5">
                    <div className="flex w-full flex-col justify-center gap-4">
                        <label className="text-14-20-regular">
                            Нарушение потребителем введенного ограничения:
                        </label>
                        <FormProvider {...methods}>
                            <form className="flex flex-col gap-2">
                                <Radio name="violation" value="1" label="Не выявлено" />
                                <Radio name="violation" value="2" label="Выявлено" />
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Violation
