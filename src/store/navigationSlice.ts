import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  history: string[];
  currentIndex: number;
  formSteps: {
    currentStep: number;
    maxSteps: number;
    formState: {
      accountNumber?: string;
      phoneNumber?: string;
      consumer?: string;
      address?: string;
    };
  };
}

const initialState: NavigationState = {
  history: ['/'],
  currentIndex: 0,
  formSteps: {
    currentStep: 1,
    maxSteps: 8,
    formState: {},
  },
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    pushRoute(state, action) {
      const path = action.payload;
      const newHistory = state.history.slice(0, state.currentIndex + 1);
      newHistory.push(path);
      state.history = newHistory;
      state.currentIndex++;
    },
    goBack(state) {
      if (state.currentIndex > 0) {
        state.currentIndex--;
      }
    },
    goForward: (state) => {
      if (state.currentIndex < state.history.length - 1) {
        state.currentIndex += 1;
      }
    },
    
    nextFormStep: (state) => {
      if (state.formSteps.currentStep < state.formSteps.maxSteps) {
        state.formSteps.currentStep += 1;
      }
    },
    prevFormStep: (state) => {
      if (state.formSteps.currentStep > 1) {
        state.formSteps.currentStep -= 1;
      }
    },
    updateFormState: (state, action: PayloadAction<Partial<NavigationState['formSteps']['formState']>>) => {
      state.formSteps.formState = { ...state.formSteps.formState, ...action.payload };
    },
    resetForm: (state) => {
      state.formSteps.currentStep = 1;
      state.formSteps.formState = {};
    },
    setFormStep: (state, action: PayloadAction<number>) => {
      state.formSteps.currentStep = action.payload;
    },
  },
});

export const { 
  pushRoute, 
  goBack, 
  goForward,
  nextFormStep, 
  prevFormStep, 
  updateFormState, 
  resetForm,
  setFormStep 
} = navigationSlice.actions;
export const navigationReducer = navigationSlice.reducer;