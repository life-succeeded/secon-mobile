import React, { useState } from 'react'
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
                const name = field.name

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
    const [currentStepId, setCurrentStepId] = useState('step1')
    const defaultValues = buildDefaultValues(wizard)

    const methods = useForm({
        defaultValues,
    })

    const dispatch = useDispatch()
    const { currentStep } = useSelector((state: RootState) => state.navigation.formSteps)

    const { photos, takePicture } = useMultiCamera()

    const onSubmit = methods.handleSubmit((data) => {
        const stepInfo = wizard.find((w) => w.id === currentStepId)
        setCurrentStepId(stepInfo.next)
    })

    const renderField = () => {
        console.log(step.content)

        if (step.content.options) {
            console.log(step.content)

            return step.content.map((field, index) => {
                return (
                    <>
                        {field.options.map(() => {
                            return (
                                <FieldRenderer
                                    key={`${field.title}_${index}`}
                                    field={field}
                                    photos={photos}
                                    takePicture={takePicture}
                                />
                            )
                        })}

                        <FieldRenderer
                            key={`${field.title}_${index}`}
                            field={field}
                            photos={photos}
                            takePicture={takePicture}
                        />
                    </>
                )
            })
        }

        return step.content.map((field, index) => {
            return (
                <FieldRenderer
                    key={`${field.title}_${index}`}
                    field={field}
                    photos={photos}
                    takePicture={takePicture}
                />
            )
        })
    }

    const step = wizard.find((item) => item.id === currentStepId)
    if (!step) {
        return <div>Шаг не найден</div>
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="relative">
                {step.title && <h1>{step.title}</h1>}

                {step.content.map((field, index) => {
                    return (
                        <FieldRenderer
                            key={`${field.title}_${index}`}
                            field={field}
                            photos={photos}
                            takePicture={takePicture}
                        />
                    )
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
