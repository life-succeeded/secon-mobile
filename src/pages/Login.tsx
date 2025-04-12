import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Button } from '../components/ui/button'
import { Header } from '../components/ui/header'
import { Input } from '../components/ui/input'
import { useState } from 'react'

import { object, string } from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { getBrigadeById } from '../api/api'
import { getFullName } from '../utils/strings'
import { InspectorTostring } from '../api/api.types'
import { loginResolver } from '../lib/validators/login'

type FormData = {
    brigadeId: string
}

export const Login = () => {
    const fm = useForm<FormData>({
        mode: 'onChange',
        reValidateMode: 'onSubmit',
        defaultValues: {
            brigadeId: '',
        },
        resolver: yupResolver(loginResolver)
    });

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const navigate = useNavigate()

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true)
        setSubmitError(null)

        try {
            const brigadeId = data.brigadeId.trim()

            const brigade = await getBrigadeById(brigadeId);

            if (!brigade || !brigade.data) {
                throw new Error('Не удалось получить бригаду')
            }

            sessionStorage.setItem('brigadeId', brigadeId)
            sessionStorage.setItem('fio1', InspectorTostring(brigade.data.first_inspector))
            sessionStorage.setItem('fio2', InspectorTostring(brigade.data.second_inspector))

            navigate('/')
        } catch (error) {
            console.error('Ошибка при создании бригады:', error)
            setSubmitError('Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
    <>
        <Header hideControls={true} />

        <FormProvider {...fm}>
            <div className="h-full w-full p-5 grid grid-rows-[minmax(0,0.8fr),minmax(0,1fr),minmax(0,4fr)] overflow-hidden">
                <div className="min-h-0 max-h-[100px]"></div>
                <form
                    onSubmit={fm.handleSubmit(data => onSubmit(data).then())}
                    className="flex w-full flex-col items-center justify-center max-h-[134px] gap-3 p-4"
                    noValidate
                >
                    <Input label="Бригада" placeholder='Введите бригаду' name={'brigadeId'} />

                    {submitError && <div className="text-sm text-red-500">{submitError}</div>}

                    <Button
                        type="submit"
                        className="mt-5 w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Вход...' : 'Войти'}
                    </Button>
                </form>
                <div />
            </div>
        </FormProvider>
    </>
)
}
