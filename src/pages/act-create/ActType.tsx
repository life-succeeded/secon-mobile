import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { updateFormState, nextFormStep } from '../../store/navigationSlice'
import { ProgressBar } from '../../components/ui/progressbar'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import Radio from '../../components/ui/radio'
import Checkbox from '../../components/ui/checkbox'

function ActInfo() {
    const dispatch = useDispatch()
    const { formState, currentStep } = useSelector((state: RootState) => state.navigation.formSteps)

    const handleNext = () => {
        if (!formState.phoneNumber?.trim()) {
            alert('Пожалуйста, введите контактный номер')
            return
        }

        dispatch(nextFormStep())
    }

    return (
        <div className="flex h-screen flex-col">
            <div className="mx-5 mt-25 flex-grow overflow-auto">
                <div className="flex w-full flex-col justify-center gap-5">
                    <ProgressBar value={currentStep} className="self-center" />
                    <div className="flex w-full flex-col justify-center gap-2 ">
                    <label className="text-14-20-regular">Акт о:</label>
                        <div className="flex flex-col gap-4 my-3">
                                <Radio label="О ВВЕДЕНИИ ОГРАНИЧЕНИЯ (ПРИОСТАНОВЛЕНИИ) КОММУНАЛЬНОЙ УСЛУГИ ПО ЭЛЕКТРОСНАБЖЕНИЮ" name="act1" />
                                <Radio label="О ВОЗОБНОВЛЕНИИ ПРЕДОСТАВЛЕНИЯ КОММУНАЛЬНОЙ УСЛУГИ ПО ЭЛЕКТРОСНАБЖЕНИЮ " name="act2" />
                                <Radio label="ОСУЩЕСТВЛЕНИЯ ПРОВЕРКИ ВВЕДЕННОГО ОГРАНИЧЕНИЯ РЕЖИМА ПОТРЕБЛЕНИЯ" name="act3" />
                                <Radio label="О САМОВОЛЬНОМ ПОДКЛЮЧЕНИИ К ЭЛЕКТРИЧЕСКИМ СЕТЯМ" name="act4" />
                        </div>
                    </div>

                    <Button onClick={handleNext} className=' mt-1'>
                        Продолжить
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ActInfo
