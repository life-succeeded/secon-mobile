import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';
import { Network } from '@capacitor/network';
import { useCreateActMutation, useSyncActsMutation } from '../api/api';
import { usePhotoService } from './PhotoServiceContext';

interface SyncContextType {
  isSyncing: boolean;
  lastSync: Date | null;
  syncData: () => Promise<void>;
}

const SyncContext = createContext<SyncContextType>({
  isSyncing: false,
  lastSync: null,
  syncData: async () => {},
});

export const SyncProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [syncActs] = useSyncActsMutation();
  const { clearPhotos } = usePhotoService();

  const syncData = useCallback(async () => {
    try {
      setIsSyncing(true);
      const status = await Network.getStatus();
      
      if (!status.connected) {
        throw new Error('No internet connection');
      }

      await syncActs().unwrap();
      clearPhotos();
      
      const now = new Date();
      setLastSync(now);
      await Preferences.set({ key: 'lastSync', value: now.toISOString() });
    } catch (error) {
      console.error('Sync failed:', error);
      throw error;
    } finally {
      setIsSyncing(false);
    }
  }, [syncActs, clearPhotos]);

  useEffect(() => {
    const loadLastSync = async () => {
      const { value } = await Preferences.get({ key: 'lastSync' });
      if (value) {
        setLastSync(new Date(value));
      }
    };
    loadLastSync();
  }, []);

  return (
    <SyncContext.Provider value={{ isSyncing, lastSync, syncData }}>
      {children}
    </SyncContext.Provider>
  );
};

export const useSync = () => useContext(SyncContext);