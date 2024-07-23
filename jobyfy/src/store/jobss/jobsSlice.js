import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobs, createJob, updateJob, deleteJob } from "../../service/jobs";

// Initial state for jobs slice
const initialState = {
  jobs: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch jobs
export const fetchJobsAsync = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await fetchJobs();
  return response.data;
});

// Async thunk to create a job
export const createJobAsync = createAsyncThunk(
  "jobs/createJob",
  async (userData) => {
    const response = await createJob(userData);
    return response.data;
  }
);

// Async thunk to update a job
export const updateJobAsync = createAsyncThunk(
  "jobs/updateJob",
  async ({ id, ...userData }) => {
    console.log(userData, "user data");
    const response = await updateJob({ id, userData });
    return response.data;
  }
);

// Async thunk to delete a job
export const deleteJobAsync = createAsyncThunk("jobs/deleteJob", async (id) => {
  await deleteJob(id);
  return id;
});

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload;
      })
      .addCase(fetchJobsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createJobAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createJobAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs.push(action.payload);
      })
      .addCase(createJobAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateJobAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateJobAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update the job in state based on action.payload
        const updatedJobIndex = state.jobs.findIndex(
          (job) => job._id === action.payload._id
        );
        if (updatedJobIndex !== -1) {
          state.jobs[updatedJobIndex] = action.payload;
        }
      })
      .addCase(updateJobAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteJobAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteJobAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = state.jobs.filter((job) => job._id !== action.payload);
      })
      .addCase(deleteJobAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default jobsSlice.reducer;
