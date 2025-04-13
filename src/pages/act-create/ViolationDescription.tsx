import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { updateFormState, nextFormStep } from '../../store/navigationSlice'
import { ProgressBar } from '../../components/ui/progressbar'
import { Button } from '../../components/ui/button'
import Radio from '../../components/ui/radio'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Input } from '../../components/ui/input'

type FormData = {
    violationDescription: string
    violationDescriptionReason?: string
}

function Violation() {
    const methods = useForm<FormData>()
    const dispatch = useDispatch()
    const { formState, currentStep } = useSelector((state: RootState) => state.navigation.formSteps)
    const [selectedViolationDescription, setSelectedViolationDescription] = useState<string>('')

    const handleNext = () => {
        dispatch(nextFormStep())
    }

    const radioValue = methods.watch('violationDescription')

    return (
        <div className="relative flex h-full flex-col p-5">
            <div className="mx-5 flex-grow overflow-auto">
                <div className="flex w-full flex-col justify-center gap-5">
                    <div className="flex w-full flex-col justify-center gap-4">
                        <label className="text-14-20-regular">
                            Описание выявленного нарушения/сведения, на основании которых сделан
                            вывод о нарушении:
                        </label>
                        <div className="flex flex-col gap-2">
                            <FormProvider {...methods}>
                                <form className="flex flex-col gap-2">
                                    <Radio
                                        name="violationDescription"
                                        value="1"
                                        label="Наличие расхода после введенного ограничения"
                                    />
                                    <Radio name="violationDescription" value="2" label="Иное" />
                                    {radioValue === '2' && (
                                        <Input
                                            name="violationDescriptionReason"
                                            placeholder="Введите причину"
                                        />
                                    )}
                                </form>
                            </FormProvider>
                        </div>
                    </div>

                    <Button onClick={handleNext} className="mt-65">
                        Продолжить
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Violation
