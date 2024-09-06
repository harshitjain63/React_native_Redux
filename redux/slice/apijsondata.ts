import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Action to fetch data from API
export const fetchData = createAsyncThunk('apidata/fetchData', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return response.json();
});

const initialState = {
  isLoading: false,
  data: null,
  isError: false,
};

const apiJsonDataSlice = createSlice({
  name: 'apidata',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default apiJsonDataSlice.reducer;
