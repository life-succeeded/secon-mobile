import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { pushRoute, goBack, goForward } from '../store/navigationSlice';
import { RootState } from '../store/store';

export const NavigationTracker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { history, currentIndex } = useSelector((state: RootState) => state.navigation);

  useEffect(() => {
    const currentPath = history[currentIndex];
    if (currentPath !== location.pathname) {
      dispatch(pushRoute(location.pathname));
    }
  }, [location.pathname]);
  

  useEffect(() => {
    const handlePopState = () => {
      const newIndex = window.history.state?.idx || 0;
      if (newIndex < currentIndex) {
        dispatch(goBack());
      } else if (newIndex > currentIndex) {
        dispatch(goForward());
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentIndex, dispatch]);

  return null;
};