import IonReactRouter from "./wrappers/IonicReactRouterWrapper";
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ActCreatePage } from './pages/ActCreate';
import { ActDetails } from './pages/ActDetails';
import { PhotoServiceProvider } from './context/PhotoServiceContext';
import { SyncProvider } from './context/SyncContext';
import { setupListeners } from '@reduxjs/toolkit/query/react';

setupIonicReact();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const AppRoutes = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/" component={Home} />
        <Route exact path="/create-act" component={ActCreatePage} />
        <Route exact path="/acts/:id" component={ActDetails} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

// Настройка listeners для RTK Query
setupListeners(store.dispatch);

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SyncProvider>
          <PhotoServiceProvider>
            <IonApp className="bg-gray-50">
              <AppRoutes />
            </IonApp>
          </PhotoServiceProvider>
        </SyncProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;