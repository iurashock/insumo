import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  userId: number;
  name: string;
  email: string;
  phone: string;
};

const initialState: UserState = {
  userId: 0,
  name: '',
  email: '',
  phone: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
    },

    clearUser() {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
