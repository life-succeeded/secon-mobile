import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  history: string[];
  currentIndex: number; // Добавляем индекс текущей позиции
}

const initialState: NavigationState = {
  history: ['/'],
  currentIndex: 0,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    pushRoute: (state, action: PayloadAction<string>) => {
      state.history = state.history.slice(0, state.currentIndex + 1);
      
      // Добавляем новый маршрут
      if (state.history[state.currentIndex] !== action.payload) {
        state.history.push(action.payload);
        state.currentIndex += 1;
      }
    },
    goBack: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
      }
    },
    goForward: (state) => {
      if (state.currentIndex < state.history.length - 1) {
        state.currentIndex += 1;
      }
    },
  },
});

export const { pushRoute, goBack, goForward } = navigationSlice.actions;
export const navigationReducer = navigationSlice.reducer;