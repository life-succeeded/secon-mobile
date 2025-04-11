import { useLocation } from 'react-router';

const routeTitles: Record<string, string> = {
  '/': 'Задачи',
  '/map': 'Карта',
  '/create': 'Акт',
  '/acts': 'Акты',
  '/report': 'Отчёт',
};

export const useRouteTitle = () => {
  const location = useLocation();
  return routeTitles[location.pathname] || 'Заголовок';
};