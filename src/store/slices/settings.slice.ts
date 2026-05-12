import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SETTINGS_CURRENCY,
  SETTINGS_LANGUAGE,
  SETTINGS_STATUS,
} from '../../constants/types';

export type SettingsState = {
  darkMode: boolean;
  mainCurrency: SETTINGS_CURRENCY;
  language: SETTINGS_LANGUAGE;
  status: SETTINGS_STATUS;
};

const initialState: SettingsState = {
  darkMode: true,
  mainCurrency: 'RON',
  language: 'en',
  status: 'idle',
};

const SettingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    hydrateFromUser(
      state,
      action: PayloadAction<Omit<SettingsState, 'status'>>,
    ) {
      state.darkMode = action.payload.darkMode;
      state.mainCurrency = action.payload.mainCurrency;
      state.language = action.payload.language;
      state.status = 'idle';
    },

    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },

    setCurrency(state, action: PayloadAction<SETTINGS_CURRENCY>) {
      state.mainCurrency = action.payload;
    },

    setLanguage(state, action: PayloadAction<SETTINGS_LANGUAGE>) {
      state.language = action.payload;
    },

    resetSettings() {
      return initialState;
    },
  },
});

export const {
  hydrateFromUser,
  toggleDarkMode,
  setCurrency,
  setLanguage,
  resetSettings,
} = SettingsSlice.actions;

export default SettingsSlice.reducer;
