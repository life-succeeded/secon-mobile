import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Button } from '../components/ui/button'
import { Header } from '../components/ui/header'
import { Input } from '../components/ui/input'
import { useEffect, useState } from 'react'
import { createBrigade } from '../api/api'
import { parseFullName } from '../utils/strings'

type FormData = {
    fio1: string
    fio2: string
}

export const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            fio1: '',
            fio2: '',
        },
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const navigate = useNavigate()

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true)
        setSubmitError(null)

        try {
            const fio1 = data.fio1.trim()
            const fio2 = data.fio2.trim()

            const brigadeResponse = await createBrigade({
                first_inspector: parseFullName(fio1),
                second_inspector: parseFullName(fio2),
            })

            if (!brigadeResponse || !brigadeResponse.data) {
                throw new Error('Не удалось создать бригаду')
            }

            sessionStorage.setItem('fio1', fio1)
            sessionStorage.setItem('fio2', fio2)
            sessionStorage.setItem('brigadeId', brigadeResponse.data.id.toString())

            navigate('/')
        } catch (error) {
            console.error('Ошибка при создании бригады:', error)
            setSubmitError('Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const validateFIO = (value: string) => {
        if (!value) return 'ФИО обязательно для заполнения'

        const trimmed = value.trim()
        if (!trimmed) return 'ФИО не может состоять только из пробелов'

        const parts = trimmed.split(/\s+/).filter((part) => part.length > 0)

        if (parts.length < 2) return 'Введите хотя бы имя и фамилию'
        if (parts.length > 3) return 'ФИО должно содержать не более 3 слов'

        for (const part of parts) {
            const subParts = part.split('-')

            for (const subPart of subParts) {
                if (!/^[А-ЯЁ][а-яё]*$/.test(subPart)) {
                    if (subParts.length > 1) {
                        return 'Каждая часть двойной фамилии/имени должна начинаться с заглавной буквы и содержать только буквы'
                    }
                    return 'Каждое слово должно начинаться с заглавной буквы и содержать только буквы'
                }
            }

            // Проверяем, что после дефиса тоже заглавная буква
            if (part.includes('-') && !/^[А-ЯЁ][а-яё]*-[А-ЯЁ][а-яё]*$/.test(part)) {
                return 'Двойные фамилии/имена должны быть в формате "Иванов-Петров"'
            }
        }

        return true
    }

    return (
        <>
            <Header hideControls={true} />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex h-full w-full flex-col items-center justify-center gap-3 self-center p-4"
                noValidate
            >
                <Input
                    label="ФИО 1"
                    error={errors.fio1?.message}
                    {...register('fio1', {
                        required: 'ФИО обязательно для заполнения',
                        validate: validateFIO,
                    })}
                />

                <Input
                    label="ФИО 2"
                    error={errors.fio2?.message}
                    {...register('fio2', {
                        required: 'ФИО обязательно для заполнения',
                        validate: validateFIO,
                    })}
                />

                {submitError && <div className="text-sm text-red-500">{submitError}</div>}

                <Button
                    type="submit"
                    className="mt-5 w-full"
                    disabled={!!errors.fio1 || !!errors.fio2 || isSubmitting}
                >
                    {isSubmitting ? 'Вход...' : 'Войти'}
                </Button>
            </form>
        </>
    )
}
