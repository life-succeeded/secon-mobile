import { renderIcon } from '../../icons/helpers';
import { Button } from '../../ui/button';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { goBack } from '../../../store/navigationSlice';
import { RootState } from '../../../store/store';

export const BackButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { history, currentIndex } = useSelector((state: RootState) => state.navigation);

  const handleGoBack = () => {
    if (currentIndex > 0) {
      const previousPath = history[currentIndex - 1];
      dispatch(goBack());
      navigate(previousPath, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <Button 
      variant="transparent" 
      onClick={handleGoBack}
    >
      {renderIcon('arrow', { fill: 'black' })}
    </Button>
    
  );
};