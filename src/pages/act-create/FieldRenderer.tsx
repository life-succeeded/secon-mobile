import { useFormContext } from 'react-hook-form'
import { Input } from '../../components/ui/input'
import { FC, useState } from 'react'
import { Button } from '../../components/ui/button'
import { useMultiCamera } from '../../lib/hooks/useMultiCamera'
import { Label } from '../../components/ui/label'
import Radio from '../../components/ui/radio'
import Checkbox from '../../components/ui/checkbox'

type WizardField = {
    type: 'input' | 'fileInput' | 'checkbox' | 'radio'
    title?: string
    placeholder?: string
    name?: string
    label?: string
    value?: any
    options?: {
        title: string
        value: string
    }[]
    cameraKey?: string
}

interface FieldRendererProps {
    field: WizardField
    photos?: Record<string, any>
    takePicture?: (type: string) => {}
}

export const FieldRenderer: FC<FieldRendererProps> = ({ field, photos, takePicture }) => {
    const { register, watch, setValue } = useFormContext()
    const [submitError, setSubmitError] = useState<string | null>(null)

    const handleTakePicture = async (type: 'counter' | 'seal') => {
        try {
            await takePicture(type)
        } catch (error) {
            console.error('Ошибка при создании фото:', error)
            setSubmitError('Не удалось сделать фото. Пожалуйста, попробуйте еще раз.')
        }
    }

    switch (field.type) {
        case 'input':
            return (
                <div className="mb-4">
                    {field.title ? <h1>{field.title}</h1> : null}
                    <Input name={field.name} placeholder={field.placeholder} />
                </div>
            )
        case 'radio':
            return <Radio name={field.name} value={field.value} label={field.label} />
        case 'checkbox':
            return <Checkbox name={field.name} value={field.value} label={field.label} />

        default:
            return null
    }
}
