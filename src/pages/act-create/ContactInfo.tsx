import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { updateFormState, nextFormStep } from '../../store/navigationSlice'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react'
import { contactInfoResolver } from '../../lib/validators/act-create/contact-info'
import { yupResolver } from '@hookform/resolvers/yup'

type FormData = {
    address: string
    number: string
    fullName: string
}

function ContactInfo() {
    const dispatch = useDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    const handleNext = () => {
        dispatch(nextFormStep())
    }

    const fm = useForm<FormData>({
        defaultValues: {
            fullName: '',
            number: '',
            address: ''
        },
        resolver: yupResolver(contactInfoResolver)
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true)
        setSubmitError(null)

        try {
            sessionStorage.setItem('contactNumber', data.number)
            sessionStorage.setItem('consumerName', data.fullName)
            sessionStorage.setItem('objectAddress', data.address)
            handleNext()
        } catch (error) {
            console.error('Ошибка при сохранении контактной информации:', error)
            setSubmitError('Произошла ошибка при сохранении данных. Пожалуйста, попробуйте еще раз.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="pt-25 relative flex h-full flex-col px-5">
            <div className="flex w-full flex-col gap-5">
                <FormProvider {...fm}>
                    <form onSubmit={fm.handleSubmit(onSubmit)} className="flex w-full flex-col gap-3">
                        <Input
                            name="number"
                            label={'Контактный номер'}
                            placeholder="Введите контактный номер"
                        />
                        {submitError && <div className="text-sm text-red-500">{submitError}</div>}
                        <Input
                            name="fullName"
                            label={'Потребитель'}
                            placeholder="Введите ФИО потребителя"
                        />
                        {submitError && <div className="text-sm text-red-500">{submitError}</div>}

                        <div className="flex flex-col gap-2">
                            <label className="text-14-20-regular">Объект</label>
                            <Input
                                name="address"
                                placeholder="Введите адрес объекта"
                            />
                            {submitError && <div className="text-sm text-red-500">{submitError}</div>}
                        </div>
                        <div className="absolute bottom-5 left-5 right-5">
                            <Button 
                                className="w-full" 
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Сохранение...' : 'Продолжить'}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}

export default ContactInfo