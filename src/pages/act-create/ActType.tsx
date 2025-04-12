import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { updateFormState, nextFormStep } from '../../store/navigationSlice'
import { Button } from '../../components/ui/button'
import Radio from '../../components/ui/radio'

function ActType() {
    const dispatch = useDispatch()
    const { formState } = useSelector((state: RootState) => state.navigation.formSteps)

    const handleNext = () => {
        if (!formState.phoneNumber?.trim()) {
            alert('Пожалуйста, введите контактный номер')
            return
        }

        dispatch(nextFormStep())
    }

    return (
        <div className="flex flex-col h-full relative px-5 pt-25"> 

            <div className="flex flex-col gap-4 overflow-auto">
                <label className="text-14-20-regular">Акт о:</label>
                <Radio label="О ВВЕДЕНИИ ОГРАНИЧЕНИЯ..." name="act1" />
                <Radio label="О ВОЗОБНОВЛЕНИИ..." name="act2" />
                <Radio label="ОСУЩЕСТВЛЕНИЯ ПРОВЕРКИ..." name="act3" />
                <Radio label="О САМОВОЛЬНОМ ПОДКЛЮЧЕНИИ..." name="act4" />
            </div>

            <div className="absolute top-130 left-5 right-5">
                <Button className="w-full" onClick={handleNext}>
                    Продолжить
                </Button>
            </div>
        </div>
    )
}

export default ActType