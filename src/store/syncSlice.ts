import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SyncState {
  lastSync: string | null;
  isSyncing: boolean;
  error: string | null;
}

const initialState: SyncState = {
  lastSync: null,
  isSyncing: false,
  error: null
};

const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    startSync: (state) => {
      state.isSyncing = true;
      state.error = null;
    },
    syncSuccess: (state, action: PayloadAction<string>) => {
      state.isSyncing = false;
      state.lastSync = action.payload;
    },
    syncFailed: (state, action: PayloadAction<string>) => {
      state.isSyncing = false;
      state.error = action.payload;
    }
  }
});

export const { startSync, syncSuccess, syncFailed } = syncSlice.actions;
export default syncSlice.reducer;