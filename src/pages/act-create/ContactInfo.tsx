import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { updateFormState, nextFormStep } from '../../store/navigationSlice'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { contactInfoResolver } from '../../lib/validators/act-create/contact-info'
import { yupResolver } from '@hookform/resolvers/yup'
import { InspectorTostring } from '../../api/api.types'
import { getBrigadeById } from '../../api/api'

function ContactInfo() {
    const dispatch = useDispatch()
    const saved = useSelector((state: RootState) => state.navigation.formSteps.formState)

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    const fm = useFormContext()

    //   useEffect(() => {
    //     if (saved) {
    //       fm.reset({
    //         address: saved.address || '',
    //         number: saved.phoneNumber || '',
    //         fullName: saved.consumer || ''
    //       })
    //     }
    //   }, [saved])

    const handleNext = async () => {
        const isValid = await fm.trigger()
        if (!isValid) return

        const data = fm.getValues()

        setIsSubmitting(true)
        setSubmitError(null)

        try {
            dispatch(
                updateFormState({
                    phoneNumber: data.phoneNumber,
                    consumer: data.fullName,
                    address: data.address,
                }),
            )

            dispatch(nextFormStep())
        } catch (error) {
            console.error('Ошибка при создании бригады:', error)
            setSubmitError('Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="relative flex h-full flex-col px-5 pt-25">
            <div className="flex w-full flex-col gap-5">
                <div className="flex w-full flex-col gap-3">
                    <Input
                        name="phoneNumber"
                        label="Контактный номер"
                        placeholder="Введите контактный номер"
                    />
                    <Input
                        name="fullName"
                        label="Потребитель"
                        placeholder="Введите ФИО потребителя"
                    />
                    <div className="flex flex-col gap-2">
                        <label className="text-14-20-regular">Объект</label>
                        <Input name="address" placeholder="Введите адрес объекта" />
                    </div>

                    {submitError && <div className="mt-1 text-sm text-red-500">{submitError}</div>}
                </div>
            </div>
            <Button className="w-full" type="button" onClick={handleNext} disabled={isSubmitting}>
                Продолжить
            </Button>
        </div>
    )
}

export default ContactInfo
