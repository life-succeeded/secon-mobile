import { useDispatch, useSelector } from 'react-redux';
import { nextFormStep, prevFormStep } from '../../store/navigationSlice';
import { RootState } from '../../store/store';
import { Button } from '../../components/ui/button';

interface StepNavigationProps {
  maxSteps: number;
  onNext?: () => void;
  onPrev?: () => void;
  hidePrev?: boolean;
}

export const StepNavigation = ({ 
  maxSteps, 
  onNext, 
  onPrev, 
  hidePrev = false 
}: StepNavigationProps) => {
  const dispatch = useDispatch();
  const { currentStep } = useSelector((state: RootState) => state.navigation.formSteps);

  const handleNext = () => {
    if (currentStep < maxSteps) {
      dispatch(nextFormStep()); 
      onNext?.();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      dispatch(prevFormStep()); 
      onPrev?.();
    }
  };

  return (
    <div className="flex items-center justify-between mt-6">
      {!hidePrev && (
        <Button 
          onClick={handlePrev} 
          disabled={currentStep === 1}
        >
          Назад
        </Button>
      )}
      
      <div className="flex-1 text-center text-sm text-gray-600">
        Шаг {currentStep} из {maxSteps}
      </div>
      
      <Button 
        onClick={handleNext}
        disabled={currentStep === maxSteps}
      >
        {currentStep === maxSteps ? 'Завершить' : 'Продолжить'}
      </Button>
    </div>
  );
};