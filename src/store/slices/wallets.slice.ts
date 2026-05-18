import { WALLETS } from '@/src/constants/constants';
import { Wallet } from '@/src/constants/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

type WalletsState = {
  items: Wallet[];
};

const initialState: WalletsState = {
  items: WALLETS,
};

export const fetchWallets = createAsyncThunk<
  Wallet[],
  void,
  { state: RootState }
>('wallets/fetch', async (_, { getState }) => {
  const userID = getState().user.userId;
  // replace with DB/API call later
  return WALLETS.filter((wallet) => wallet.userId === userID);
});

const walletsSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    addWallet(state, action: PayloadAction<Wallet>) {
      state.items.push(action.payload);
    },

    updateWallet(
      state,
      action: PayloadAction<{ id: string; field: string; value: string }>,
    ) {
      const index = state.items.findIndex(
        (c) => c.walletId === action.payload.id,
      );
      if (index !== -1) {
        state.items[index].name = action.payload.value;
      }
    },

    deleteWallet(state, action: PayloadAction<string>) {
      state.items = state.items.filter((c) => c.walletId !== action.payload);
    },

    clearWallets(state) {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWallets.pending, (state) => {
        // do nothing
      })
      .addCase(fetchWallets.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchWallets.rejected, (state) => {
        // throw error
      });
  },
});

export const { addWallet, updateWallet, deleteWallet, clearWallets } =
  walletsSlice.actions;

export default walletsSlice.reducer;
