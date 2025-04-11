import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { pushRoute } from '../store/navigationSlice';
import { RootState } from '../store/store';

export const NavigationTracker = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { history, currentIndex } = useSelector((state: RootState) => state.navigation);
  
    useEffect(() => {
      const currentPath = history[currentIndex];
      if (currentPath !== location.pathname) {
        dispatch(pushRoute(location.pathname));
      }
    }, [location.pathname, dispatch]);
  
    return null;
  };