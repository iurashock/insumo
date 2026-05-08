import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import userReducer from './slices/user.slice';
import categoriesReducer from './slices/categories.slice';
import settingsReducer from './slices/settings.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    categories: categoriesReducer,
    settings: settingsReducer,
    // add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
