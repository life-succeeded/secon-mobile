import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { updateFormState, nextFormStep } from '../../store/navigationSlice'
import { ProgressBar } from '../../components/ui/progressbar'
import { Button } from '../../components/ui/button'
import Radio from '../../components/ui/radio'

function SwitchingDevice() {
    const dispatch = useDispatch()
    const { formState, currentStep } = useSelector((state: RootState) => state.navigation.formSteps)

    const handleNext = () => {

        dispatch(nextFormStep())
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="mx-5flex-grow overflow-auto">
                <div className="flex w-full flex-col justify-center gap-5">
                    <div className="flex w-full flex-col justify-center gap-4 ">
                    <label className="text-14-20-regular">Коммутационный (вводной) аппарат:</label>
                        <div className="flex flex-col gap-2">
                                <Radio label="Имеется" name="yes" />
                                <Radio label="Отсутствует" name="no" />
                        </div>
                    </div>

                    <Button onClick={handleNext} className=' mt-65'>
                        Продолжить
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SwitchingDevice
