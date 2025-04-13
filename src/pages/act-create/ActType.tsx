// components/act-create/ActType.tsx
import { useDispatch } from 'react-redux'
import { setFormStep } from '../../store/navigationSlice'
import { Button } from '../../components/ui/button'
import Radio from '../../components/ui/radio'
import { useFormContext } from 'react-hook-form'

const ACT_TYPES = [
    {
        id: 'act1',
        label: 'О ВВЕДЕНИИ ОГРАНИЧЕНИЯ ПОДАЧИ ЭЛЕКТРОЭНЕРГИИ',
        value: 'restriction',
        step: 5,
    },
    {
        id: 'act2',
        label: 'О ВОЗОБНОВЛЕНИИ ПОДАЧИ ЭЛЕКТРОЭНЕРГИИ',
        value: 'resumption',
        step: 6,
    },
    {
        id: 'act3',
        label: 'ОСУЩЕСТВЛЕНИЯ ПРОВЕРКИ ПРИБОРОВ УЧЕТА',
        value: 'inspection',
        step: 7,
    },
    {
        id: 'act4',
        label: 'О САМОВОЛЬНОМ ПОДКЛЮЧЕНИИ К ЭЛЕКТРИЧЕСКИМ СЕТЯМ',
        value: 'unauthorized',
        step: 8,
    },
]

function ActType() {
    const dispatch = useDispatch()
    const fm = useFormContext()

    const onSubmit = async () => {
        const isValid = await fm.trigger('actType')
        if (!isValid) return

        const value = fm.getValues('actType')
        const selectedAct = ACT_TYPES.find((act) => act.value === value)

        sessionStorage.setItem('actType', value)
        dispatch(setFormStep(selectedAct!.step))
    }

    return (
        <div className="relative flex h-full flex-col px-5 pt-25">
            <div className="mb-20 flex flex-col gap-4 overflow-auto">
                <label className="text-14-20-regular">Акт о:</label>

                {ACT_TYPES.map((type) => (
                    <Radio
                        key={type.id}
                        name="actType"
                        value={type.value}
                        label={type.label}
                        checked={fm.watch('actType') === type.value}
                        onChange={() => {
                            fm.setValue('actType', type.value, { shouldValidate: true })
                        }}
                        wrapperClassName="items-start"
                    />
                ))}

                {typeof fm.formState.errors.actType?.message === 'string' && (
                    <p className="mt-2 text-sm text-red-500">
                        {fm.formState.errors.actType.message}
                    </p>
                )}
            </div>

            <div className="absolute right-5 bottom-5 left-5">
                <Button
                    className="w-full"
                    type="button"
                    onClick={onSubmit}
                    disabled={fm.formState.isSubmitting}
                >
                    {fm.formState.isSubmitting ? 'Загрузка...' : 'Продолжить'}
                </Button>
            </div>
        </div>
    )
}

export default ActType
