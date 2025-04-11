import { AppRoutes } from './lib/routes';
import { Header } from './components/ui/header';
import { Navbar } from './components/ui/navbar';
import { NavigationTracker } from './lib/NavigationTracker';

function App() {
  return (
      <div className="flex h-screen flex-col">
        <Header />
    
        <main className="flex-1 overflow-auto p-4">
          <AppRoutes />
          <NavigationTracker />
        </main>
        
        <Navbar />
      </div>
  );
}

export default App
