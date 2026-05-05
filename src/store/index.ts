import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import categoriesReducer from './slices/categories.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    // add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
