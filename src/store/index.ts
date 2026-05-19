import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.slice';
import userReducer from './user/user.slice';
import categoriesReducer from './categories/categories.slice';
import settingsReducer from './settings/settings.slice';
import dataReducer from './data/data.slice';
import walletsReducer from './wallets/wallets.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    categories: categoriesReducer,
    data: dataReducer,
    settings: settingsReducer,
    wallets: walletsReducer,
    // add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
};
