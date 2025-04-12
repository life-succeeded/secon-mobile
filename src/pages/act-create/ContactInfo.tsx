import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { updateFormState, nextFormStep } from '../../store/navigationSlice'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

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

    return (
        <div className="flex flex-col h-full relative px-5 pt-25">
                <div className="flex w-full flex-col gap-5">
                    <div className="flex w-full flex-col gap-3">
                        <Input
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
                    </div>
                </div>
                <div className="absolute top-130 left-5 right-5">
                <Button className="w-full" onClick={handleNext}>
                    Продолжить
                </Button>
            </div>
        </div>
    )
}
export default ContactInfo