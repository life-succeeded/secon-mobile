import { useFormContext } from 'react-hook-form'
import { Input } from '../../components/ui/input'
import { FC, useState } from 'react'
import { Button } from '../../components/ui/button'
import { useMultiCamera } from '../../lib/hooks/useMultiCamera'
import { Label } from '../../components/ui/label'

type WizardField = {
    type: 'input' | 'fileInput' | 'checkbox' | 'radio';
    title?: string;
    placeholder?: string;
    name?: string;
    options?: {
        title: string;
        value: string;
    }[];
    cameraKey?: string;
};

interface FieldRendererProps {
    field: WizardField;
    photos?: Record<string, any>;
    takePicture?: (type: string) => {};
}

export const FieldRenderer: FC<FieldRendererProps> = ({ field, photos, takePicture }) => {
    const { register, watch, setValue } = useFormContext();
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
                    <Input
                        name={field.name}
                        placeholder={field.placeholder}
                    />
                </div>
            );
        // case 'fileInput': {
        //     const noAccess = watch('noAccess'); // смотрим на чекбокс
        //
        //     const handleTakePicture = async () => {
        //         if (!takePicture || !field.cameraKey) return;
        //         try {
        //             await takePicture(field.cameraKey);
        //         } catch (error) {
        //             console.error('Ошибка при создании фото:', error);
        //         }
        //     };
        //
        //     return (
        //         <div className="mb-4">
        //             {field.title && <h1>{field.title}</h1>}
        //
        //             <Button
        //                 type="button"
        //                 onClick={handleTakePicture}
        //                 disabled={noAccess}
        //             >
        //                 {field.placeholder || 'Добавить фото'}
        //             </Button>
        //
        //             {!noAccess && field.cameraKey && photos?.[field.cameraKey] && (
        //                 <Label icon="image" text={photos[field.cameraKey].fileName} />
        //             )}
        //         </div>
        //     );
        // }


        default:
            return null;
    }
};