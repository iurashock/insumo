import { CATEGORIES } from '@/src/constants/constants';
import { Category } from '@/src/constants/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type CategoriesStatus = 'idle' | 'loading' | 'error';

type CategoriesState = {
  items: Category[];
  status: CategoriesStatus;
};

const initialState: CategoriesState = {
  items: CATEGORIES,
  status: 'idle',
};

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetch',
  async () => {
    // replace with DB/API call later
    return CATEGORIES;
  },
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<Category>) {
      state.items.push(action.payload);
    },

    updateCategory(state, action: PayloadAction<Category>) {
      const index = state.items.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    deleteCategory(state, action: PayloadAction<number>) {
      state.items = state.items.filter((c) => c.id !== action.payload);
    },

    clearCategories(state) {
      state.items = [];
      state.status = 'idle';
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { addCategory, updateCategory, deleteCategory, clearCategories } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
