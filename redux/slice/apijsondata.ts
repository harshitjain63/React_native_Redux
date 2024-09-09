import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

type values = {
  id: string,
  title: string,
  body: string,
  userId: string,
}

// Action to fetch data from API
export const fetchData = createAsyncThunk('apidata/fetchData', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return response.json();
});

const selected = (state: RootState) => state.apidata.data;

export const selectFilteredTasks = createSelector(
  [selected, (state : RootState , searchQuery: string) => searchQuery],
  (data : values[], searchQuery) => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
);

const initialState = {
  isLoading: false,
  data: [],
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
