import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FIND_DEPARTMENT, FIND_EMPLOYEES } from "../../api";
import { RootState } from "../../app/store";
import {
  Department,
  UpdateEmployee,
  UpdateEmployeeWithoutId,
} from "../../interfaces";

export interface DashboardState {
  employee: UpdateEmployee[];
  department: Department[];
}

const initialState: DashboardState = {
  employee: [],
  department: [],
};

export const incrementAsync = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const data = {
      employee: [],
      department: [],
    };
    const { data: employee } = FIND_EMPLOYEES();
    data.employee = employee.findAllActiveEmployee;
    const { data: department } = FIND_DEPARTMENT();
    data.department = department.department;
    return data;
  }
);

export const dashboardSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    updateEmployee: (state, action: PayloadAction<UpdateEmployee>) => {},
    deleteEmployee: (state, action: PayloadAction<number>) => {
      state.employee.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(incrementAsync.fulfilled, (state, action) => {
      state.department = action.payload.department;
      state.employee = action.payload.employee;
    });
  },
});

export const { updateEmployee, deleteEmployee } = dashboardSlice.actions;

export const selectDashboard = (state: RootState) => state.dashboard;

export default dashboardSlice.reducer;
