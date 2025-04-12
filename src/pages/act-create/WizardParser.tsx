import React from 'react'
import { Button } from '../../components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { nextFormStep } from '../../store/navigationSlice'
import { RootState } from '../../store/store'
import { FieldRenderer } from './FieldRenderer'
import { FormProvider, useForm } from 'react-hook-form'
import { useMultiCamera } from '../../lib/hooks/useMultiCamera'

function buildDefaultValues(wizardConfig: any[]) {
    return wizardConfig.reduce(
        (acc, step) => {
            step.content?.forEach((field: any) => {
                const name = field.name;

                if (!(name in acc)) {
                    if (field.type === 'checkbox') {
                        acc[name] = false
                    } else if (field.type === 'fileInput') {
                        acc[name] = []
                    } else {
                        acc[name] = ''
                    }
                }
            })
            return acc
        },
        {} as Record<string, any>,
    )
}

const WizardParser = ({ wizard }) => {
    const defaultValues = buildDefaultValues(wizard)

    const methods = useForm({
        defaultValues,
    })

    const dispatch = useDispatch()
    const { currentStep } = useSelector((state: RootState) => state.navigation.formSteps)

    const { photos, takePicture } = useMultiCamera();

    const onSubmit = methods.handleSubmit((data) => {
        console.log('Данные формы (все поля):', data);

        if (step?.id === 'step3') {
            if (!data.noAccess && (!photos.counter || !photos.seal)) {
                alert('Пожалуйста, добавьте фото или отметьте "Нет доступа"');
                return;
            }
        }

        // Сохранить в sessionStorage если надо
        if (!data.noAccess) {
            sessionStorage.setItem('counterPhoto', JSON.stringify(photos.counter));
            sessionStorage.setItem('sealPhoto', JSON.stringify(photos.seal));
        } else {
            sessionStorage.removeItem('counterPhoto');
            sessionStorage.removeItem('sealPhoto');
        }
        sessionStorage.setItem('noAccess', String(data.noAccess));

        // Переходим на следующий шаг
        dispatch(nextFormStep());
    });

    const step = wizard.find((item) => item.currentStep === currentStep)
    if (!step) {
        return <div>Шаг не найден</div>
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="relative">
                {step.title && <h1>{step.title}</h1>}

                {step.content.map((field, index) => {
                    return <FieldRenderer key={`${field.title}_${index}`} field={field} photos={photos} takePicture={takePicture}/>
                })}

                <div className="right-5 bottom-5 left-5">
                    <Button className="w-full" type="submit">
                        Продолжить
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}

export default WizardParser
