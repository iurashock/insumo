import {
  getItemFromStorage,
  removeItemFromStorage,
  setItemFromStorage,
} from '@/src/utils/storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginAsUser } from '../thunks/loginAsUser';
import { hydrateFromUser } from './settings.slice';
import { setUser, UserState } from './user.slice';
import {
  ACCESS_TOKEN_KEY,
  USER_ID_KEY,
  USERS,
} from '@/src/constants/constants';

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

interface AuthState {
  status: AuthStatus;
  error: string | null;
}

const initialState: AuthState = {
  status: 'idle',
  error: null,
};

// ✅ Async login example
export const login = createAsyncThunk<
  void,
  { email: string; password: string }
>('auth/login', async (credentials, thunkAPI) => {
  try {
    // TODO: replace with real API call
    const response = await fakeLogin(credentials);

    // ✅ Store token securely (side effect)
    await setItemFromStorage(ACCESS_TOKEN_KEY, response.accessToken);
    await setItemFromStorage(USER_ID_KEY, response.userId.toString());

    const user = USERS.find((u) => u.userId === response.userId);
    if (!user) throw new Error('User not found');

    const userState: UserState = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };

    thunkAPI.dispatch(setUser(userState));
    thunkAPI.dispatch(hydrateFromUser(user));

    return;
  } catch (error) {
    return thunkAPI.rejectWithValue('Login failed');
  }
});

export const restoreSession = createAsyncThunk<void>(
  'auth/restoreSession',
  async (_, thunkAPI) => {
    const token = await getItemFromStorage(ACCESS_TOKEN_KEY);
    const userIdRaw = await getItemFromStorage(USER_ID_KEY);

    if (!token || !userIdRaw) {
      return thunkAPI.rejectWithValue('No active session');
    }

    const userId = Number(userIdRaw);
    const user = USERS.find((u) => u.userId === userId);

    if (!user) {
      return thunkAPI.rejectWithValue('No user found');
    }

    const userState: UserState = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };

    thunkAPI.dispatch(setUser(userState));
    thunkAPI.dispatch(setUser(userState));

    return;
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await removeItemFromStorage(ACCESS_TOKEN_KEY);
  await removeItemFromStorage(USER_ID_KEY);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      /* ------------------ LOGIN ------------------ */
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = 'authenticated';
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'unauthenticated';
        state.error = action.payload as string;
      })

      /* -------------- LOGIN AS USER   ------------- */
      .addCase(loginAsUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsUser.fulfilled, (state) => {
        state.status = 'authenticated';
        state.error = null;
      })
      .addCase(loginAsUser.rejected, (state) => {
        state.status = 'unauthenticated';
      })

      /* -------------- RESTORE SESSION ------------- */
      .addCase(restoreSession.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(restoreSession.fulfilled, (state) => {
        state.status = 'authenticated';
      })
      .addCase(restoreSession.rejected, (state) => {
        state.status = 'unauthenticated';
      })

      .addCase(logout.fulfilled, (state) => {
        state.status = 'unauthenticated';
        state.error = null;
      });
  },
});

export default authSlice.reducer;

// mock function

async function fakeLogin({
  email,
}: {
  email: string;
  password: string;
}): Promise<{ accessToken: string; userId: number }> {
  const user = USERS.find((u) => u.email === email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          accessToken: 'fake-token',
          userId: user.userId,
        }),
      500,
    ),
  );
}
