import { Button } from '../../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { prevFormStep } from '../../../store/navigationSlice';
import { RootState } from '../../../store/store';
import { renderIcon } from '../../icons/helpers';

export const BackButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { formSteps } = useSelector((state: RootState) => state.navigation);

  const isOnCreatePage = location.pathname.startsWith('/create');
  const isNotFirstStep = formSteps.stepHistory.length > 1;

  const handleGoBack = () => {
    if (isOnCreatePage && isNotFirstStep) {
      dispatch(prevFormStep());
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <Button variant="transparent" onClick={handleGoBack}>
      {renderIcon('arrow', { fill: 'black' })}
    </Button>
  );
};
