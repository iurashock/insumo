import {
  ALL_ENTRIES_LIST_KEY,
  ENTRIES,
  SELECTED_ENTRY_ID_KEY,
} from '@/src/constants/constants';
import { Entry, IntervalRange } from '@/src/constants/types';
import { setItemInStorage } from '@/src/utils/storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DataState = {
  selectedEntryId: string;
  selectedIntervalRange: IntervalRange;
  allEntriesList: Entry[];
};

const initialState: DataState = {
  selectedEntryId: '',
  selectedIntervalRange: { choice: 'current_month', start: null, end: null },
  allEntriesList: [],
};

export const refreshData = createAsyncThunk<Entry[]>(
  'data/refresData',
  async () => {
    // ENTRIES has highes prio now, for developing
    await setItemInStorage(ALL_ENTRIES_LIST_KEY, JSON.stringify(ENTRIES));

    return ENTRIES;
  },
);

const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    hydrateFromUser(state, action: PayloadAction<DataState>) {
      state.selectedEntryId = action.payload.selectedEntryId;
      state.allEntriesList = action.payload.allEntriesList;
    },

    setSelectedEntryId(state, action: PayloadAction<string>) {
      state.selectedEntryId = action.payload;
    },

    setSelectedIntervalRange(state, action: PayloadAction<IntervalRange>) {
      state.selectedIntervalRange = action.payload;
    },

    setAllEntriesList(state, action: PayloadAction<Entry[]>) {
      state.allEntriesList = action.payload;
    },
    resetData() {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(refreshData.fulfilled, (state, action) => {
      // state.selectedEntryId = action.payload.selectedEntryId;
      // state.allEntriesList = action.payload.allEntriesList;
      state.allEntriesList = action.payload;
    });
  },
});

export const {
  hydrateFromUser,
  setSelectedEntryId,
  setSelectedIntervalRange,
  setAllEntriesList,
  resetData,
} = DataSlice.actions;

export default DataSlice.reducer;
