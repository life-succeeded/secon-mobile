import { useFormContext } from 'react-hook-form'
import { Input } from '../../components/ui/input'
import { FC } from 'react'
import Radio from '../../components/ui/radio'
import { Checkbox } from '../../components/ui/checkbox'

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
    disabled: boolean
    required: boolean
}

interface FieldRendererProps {
    field: WizardField
    photos?: Record<string, any>
    takePicture?: (type: string) => {}
}

export const FieldRenderer: FC<FieldRendererProps> = ({ field, photos, takePicture }) => {
    const { register } = useFormContext()

    const handleTakePicture = async (type: 'counter' | 'seal') => {
        try {
            await takePicture(type)
        } catch (error) {
            console.error('Ошибка при создании фото:', error)
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
            return (
                <Checkbox
                    label={field.title}
                    name={field.name}
                    register={register}
                    disabled={field.disabled}
                    required={field.required}
                />
            )

        default:
            return null
    }
}
