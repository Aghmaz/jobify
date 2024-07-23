import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import {
  createUser,
  loginUser,
  fetchUser,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../../service/userservice";

const initialState = {
  users: [],
  user: null,
};

export const getUser = createAsyncThunk("user/getUser", async (id) => {
  const response = await fetchUser(id);
  return response.data;
});

export const login = createAsyncThunk(
  "/login",
  async ({ email, password }, { dispatch }) => {
    try {
      const response = await loginUser({ email, password });
      const token = response;
      dispatch(storeToken(token));
      return response.data;
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    }
  }
);

export const storeToken = createAction("user/login/storeToken");

export const addUser = createAsyncThunk("signup", async (userData) => {
  try {
    const response = await createUser(userData);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error.message);
    throw error.response.data.message;
  }
});

export const addCompany = createAsyncThunk(
  "/api/companies/",
  async (userData) => {
    try {
      const response = await createCompany(userData);
      return response.data;
    } catch (error) {
      console.error("Error adding company:", error.message);
      throw error.response.data.message;
    }
  }
);

export const update_Company = createAsyncThunk(
  "/customer/update",
  async ({ id, ...userData }) => {
    try {
      const response = await updateCompany({ id, userData });
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const delete_Company = createAsyncThunk("/user", async (userId) => {
  await deleteCompany(userId);
  return userId;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers(builder) {
    builder

      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
