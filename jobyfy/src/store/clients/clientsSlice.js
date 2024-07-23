import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/Axios";

const initialState = {
  clients: [],
};

export const getAllCompanies = createAsyncThunk(
  "clients/getAllCompanies",
  async () => {
    const response = await axios.get(`/api/companies`);
    return response.data;
  }
);

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllCompanies.fulfilled, (state, action) => {
      state.clients = action.payload;
    });
  },
});

export default clientsSlice.reducer;
