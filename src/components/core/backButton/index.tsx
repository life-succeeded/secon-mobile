import { renderIcon } from '../../icons/helpers';
import { Button } from '../../ui/button';
import { useNavigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { goBack, prevFormStep } from '../../../store/navigationSlice';
import { RootState } from '../../../store/store';

export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { history, currentIndex, formSteps } = useSelector((state: RootState) => state.navigation);

  const isOnCreatePage = location.pathname.startsWith('/create');
  const isNotFirstStep = formSteps.currentStep > 1;

  const handleGoBack = () => {
    if (isOnCreatePage && isNotFirstStep) {
      dispatch(prevFormStep());
    } else {
      if (currentIndex > 0) {
        const previousPath = history[currentIndex - 1];
        dispatch(goBack());
        navigate(previousPath, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  };

  return (
    <Button variant="transparent" onClick={handleGoBack}>
      {renderIcon('arrow', { fill: 'black' })}
    </Button>
  );
};
