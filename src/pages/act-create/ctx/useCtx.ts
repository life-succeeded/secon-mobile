import { useContext } from 'react';
import { ActCreateContext } from './ctx';

export const usePageContext = () => {
  const context = useContext(ActCreateContext);

  if (!context) {
    throw new Error('useAppContext must be init');
  }

  return context;
};