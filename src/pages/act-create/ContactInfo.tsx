import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updateFormState, nextFormStep } from '../../store/navigationSlice';
import { ProgressBar } from '../../components/ui/progressbar';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

function ContactInfo() {
    const dispatch = useDispatch();
    const { formState, currentStep } = useSelector((state: RootState) => state.navigation.formSteps);

    const handleNext = () => {
        if (!formState.phoneNumber?.trim()) {
            alert('Пожалуйста, введите контактный номер');
            return;
        }
        console.log({currentStep})

        dispatch(nextFormStep());
    };

    return (
        <div className="flex h-screen flex-col">
            <div className="mx-5 mt-25 flex-grow overflow-auto">
                <div className="flex w-full flex-col justify-center gap-5">
                    <ProgressBar 
                        value={currentStep} 
                        className="self-center" 
                    />
                    
                    <div className="flex w-full flex-col justify-center gap-3">
                        <div className = "flex flex-col gap-2">
                        <label className="text-14-20-regular">
                            Контактный номер
                        </label>
                        <Input 
                            value={formState.phoneNumber || ''}
                            placeholder="Введите контактный номер" 
                            onChange={(e) =>
                                dispatch(updateFormState({ 
                                    phoneNumber: e.target.value 
                                }))
                            }
                        />
                        </div >
                        <div className = "flex flex-col gap-2">
                        <label className="text-14-20-regular">
                            Потребитель
                        </label>
                        <Input 
                            value={formState.consumer || ''}
                            placeholder="Введите ФИО потребителя" 
                            onChange={(e) =>
                                dispatch(updateFormState({ 
                                    phoneNumber: e.target.value 
                                }))
                            }
                        />
                        </div>
                        <div className = "flex flex-col gap-2">
                        <label className="text-14-20-regular">
                            Объект
                        </label>
                        <Input 
                            value={formState.address || ''}
                            placeholder="Введите адрес объекта" 
                            onChange={(e) =>
                                dispatch(updateFormState({ 
                                    phoneNumber: e.target.value 
                                }))
                            }
                        />
                        </div>
                    </div>
                    
                    <Button 
                        onClick={handleNext}
                        className='mt-28'
                    >
                        Продолжить
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ContactInfo;
