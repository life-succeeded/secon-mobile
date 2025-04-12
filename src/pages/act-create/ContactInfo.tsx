import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { updateFormState, nextFormStep } from '../../store/navigationSlice'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'

type FormData = {
    adress: string
    number: string
    fullName: string
}

function ContactInfo() {
    const dispatch = useDispatch()
    const { formState, currentStep } = useSelector((state: RootState) => state.navigation.formSteps)

    const handleNext = () => {
        if (!formState.phoneNumber?.trim()) {
            alert('Пожалуйста, введите контактный номер')
            return
        }
        console.log({ currentStep })

        dispatch(nextFormStep())
    }

    const fm = useForm<FormData>()

    return (
        <div className="pt-25 relative flex h-full flex-col px-5">
            <div className="flex w-full flex-col gap-5">
                <FormProvider {...fm}>
                    <form className="flex w-full flex-col gap-3">
                        <Input
                            name="number"
                            label={'Контактный номер'}
                            value={formState.phoneNumber || ''}
                            placeholder="Введите контактный номер"
                            onChange={(e) =>
                                dispatch(
                                    updateFormState({
                                        phoneNumber: e.target.value,
                                    }),
                                )
                            }
                        />
                        <Input
                            name="fullName"
                            label={'Потребитель'}
                            value={formState.consumer || ''}
                            placeholder="Введите ФИО потребителя"
                            onChange={(e) =>
                                dispatch(
                                    updateFormState({
                                        consumer: e.target.value,
                                    }),
                                )
                            }
                        />

                        <div className="flex flex-col gap-2">
                            <label className="text-14-20-regular">Объект</label>
                            <Input
                                name="addres"
                                value={formState.address || ''}
                                placeholder="Введите адрес объекта"
                                onChange={(e) =>
                                    dispatch(
                                        updateFormState({
                                            address: e.target.value,
                                        }),
                                    )
                                }
                            />
                        </div>
                    </form>
                </FormProvider>
            </div>
            <div className="top-130 absolute left-5 right-5">
                <Button className="w-full" onClick={handleNext}>
                    Продолжить
                </Button>
            </div>
        </div>
    )
}
export default ContactInfo
