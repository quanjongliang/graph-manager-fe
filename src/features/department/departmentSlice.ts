import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FIND_DEPARTMENT } from "../../api";
import { RootState } from "../../app/store";
import { Department } from "../../interfaces";

export interface DepartmentState {
  department: Department[];
}

const initialState: DepartmentState = {
  department: [],
};

export const getDepartment = createAsyncThunk(
  "department/fetchDepartment",
  async () => {
    const { data: department } = FIND_DEPARTMENT();
    return department.department;
  }
);

export const departmentSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDepartment.fulfilled, (state, action) => {
      state.department = action.payload;
    });
  },
});

export const {} = departmentSlice.actions;

export const selectDepartment = (state: RootState) => state.department;

export default departmentSlice.reducer;
