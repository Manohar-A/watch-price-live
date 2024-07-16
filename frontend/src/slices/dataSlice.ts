import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface DataState {
  data: any[];
  total: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  code: string;
}

const initialState: DataState = {
  data: [],
  total: 0,
  status: 'idle',
  error: null,
  code: 'BTC',
};

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (code: string) => {
    const response = await axios.get(`http://localhost:5001/api/coin-data?code=${code}&limit=20`);
    return response.data// Assuming response.data is { data: array, total: number }
  }
);

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<{ data: any[], total: number }>) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch data';
      });
  },
});

export const { setCode } = dataSlice.actions;
export const selectData = (state: { data: DataState }) => state.data;

export default dataSlice.reducer;
