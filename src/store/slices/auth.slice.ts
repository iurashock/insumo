import { getToken, removeToken, setToken } from '@/src/utils/storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

interface AuthState {
  status: AuthStatus;
  error: string | null;
}

const ACCESS_TOKEN_KEY = 'accessToken';

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
    console.log('entered here');
    const response = await fakeLogin(credentials);
    console.log('after fake login');
    // ✅ Store token securely (side effect)
    await setToken(ACCESS_TOKEN_KEY, response.accessToken);
    console.log('after set item');

    return;
  } catch (error) {
    return thunkAPI.rejectWithValue('Login failed');
  }
});

export const restoreSession = createAsyncThunk<void>(
  'auth/restoreSession',
  async (_, thunkAPI) => {
    const token = await getToken(ACCESS_TOKEN_KEY);

    if (!token) {
      return thunkAPI.rejectWithValue('No active session');
    }

    return;
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await removeToken(ACCESS_TOKEN_KEY);
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

        console.log('LOGIN PENDING');
      })
      .addCase(login.fulfilled, (state) => {
        state.status = 'authenticated';

        console.log('LOGIN FULFILLED');
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'unauthenticated';
        state.error = action.payload as string;
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
async function fakeLogin(_: {
  email: string;
  password: string;
}): Promise<{ accessToken: string }> {
  console.log('fake login');
  return new Promise((resolve) =>
    setTimeout(() => resolve({ accessToken: 'fake-token' }), 500),
  );
}
