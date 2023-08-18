import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllDjUpcomingEvents } from '../services/djService';

export const fetchGigs = createAsyncThunk('gigs/fetchAll', async () => {
  const response = await fetchAllDjUpcomingEvents();
  return response;
});

const initialState = {
  gigsList: [],
  loading: false,
  error: null,
};

const gigsSlice = createSlice({
  name: 'gigs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.gigsList = action.payload;
      })
      .addCase(fetchGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectGigsData = (state) => state.gigs;

export default gigsSlice.reducer;
