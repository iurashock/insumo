import { Entry } from '@/src/constants/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DataState = {
  selectedEntryId: string;
  allEntriesList: Entry[];
};

const initialState: DataState = {
  selectedEntryId: '',
  allEntriesList: [],
};

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

    setAllEntriesList(state, action: PayloadAction<Entry[]>) {
      state.allEntriesList = action.payload;
    },
    resetData() {
      return initialState;
    },
  },
});

export const {
  hydrateFromUser,
  setSelectedEntryId,
  setAllEntriesList,
  resetData,
} = DataSlice.actions;

export default DataSlice.reducer;
