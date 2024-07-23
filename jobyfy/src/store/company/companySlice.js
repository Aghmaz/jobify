import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import { fetchCompanies } from "../../service/catergoryService";

const initialState = {
  category: [],
};

export const getAllCategory = createAsyncThunk("/api/companies/", async () => {
  try {
    const response = await fetchCompanies();
    return response.data;
  } catch (error) {
    throw error;
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.category = action.payload;
    });
  },
});

export default categorySlice.reducer;
