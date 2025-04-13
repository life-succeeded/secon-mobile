import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
  history: string[];
  currentIndex: number;
  formSteps: {
    currentStep: number;
    maxSteps: number;
    stepHistory: number[];
    actType?: string;
    violation?: string;
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
    maxSteps: 99,
    stepHistory: [1],
    actType: undefined,
    violation: undefined,
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
    goForward(state) {
      if (state.currentIndex < state.history.length - 1) {
        state.currentIndex += 1;
      }
    },
    nextFormStep(state) {
      if (state.formSteps.currentStep < state.formSteps.maxSteps) {
        const next = state.formSteps.currentStep + 1;
        state.formSteps.stepHistory.push(next);
        state.formSteps.currentStep = next;
      }
    },
    prevFormStep(state) {
      if (state.formSteps.stepHistory.length > 1) {
        state.formSteps.stepHistory.pop();
        state.formSteps.currentStep =
          state.formSteps.stepHistory[state.formSteps.stepHistory.length - 1];
      }
    },
    setFormStep(state, action: PayloadAction<number>) {
      const step = action.payload;
      if (state.formSteps.stepHistory[state.formSteps.stepHistory.length - 1] !== step) {
        state.formSteps.stepHistory.push(step);
      }
      state.formSteps.currentStep = step;
    },
    setActType(state, action: PayloadAction<string>) {
      state.formSteps.actType = action.payload;
    },
    setViolation(state, action: PayloadAction<string>) {
      state.formSteps.violation = action.payload;
    },
    updateFormState(state, action: PayloadAction<Partial<NavigationState['formSteps']['formState']>>) {
      state.formSteps.formState = {
        ...state.formSteps.formState,
        ...action.payload,
      };
    },
    resetForm(state) {
      state.formSteps.currentStep = 1;
      state.formSteps.stepHistory = [1];
      state.formSteps.formState = {};
      state.formSteps.actType = undefined;
      state.formSteps.violation = undefined;
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
  setFormStep,
  setActType,
  setViolation, // добавлен в экспорт
} = navigationSlice.actions;

export const navigationReducer = navigationSlice.reducer;
