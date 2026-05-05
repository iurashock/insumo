import { createAsyncThunk } from '@reduxjs/toolkit';
import { USERS } from '@/src/constants/constants';
import { setUser } from '@/src/store/slices/user.slice';
import { hydrateFromUser } from '@/src/store/slices/settings.slice';

export const loginAsUser = createAsyncThunk<void, { userId: number }>(
  'auth/loginAsUser',
  async ({ userId }, thunkAPI) => {
    const user = USERS.find((u) => u.userId === userId);

    if (!user) {
      throw new Error('User not found');
    }

    // ✅ User identity slice
    thunkAPI.dispatch(
      setUser({
        userId: user.userId,
        name: user.name,
        email: user.email,
        phone: user.phone,
      }),
    );

    // ✅ Settings slice derived from user
    thunkAPI.dispatch(
      hydrateFromUser({
        darkMode: user.darkMode,
        mainCurrency: user.mainCurrency,
        language: 'en',
        // status: 'idle',
      }),
    );
  },
);
