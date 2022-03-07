import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FIND_DEPARTMENT,
  FIND_EMPLOYEES,
  FIND_EMPLOYEES_BY_NAME,
} from "../../api";
import { RootState } from "../../app/store";
import {
  Department,
  UpdateEmployee,
  UpdateEmployeeWithoutId,
} from "../../interfaces";

export interface EmployeeState {
  employee: UpdateEmployee[];
}

const initialState: EmployeeState = {
  employee: [],
};

export const getEmployee = createAsyncThunk(
  "employee/fetchEmployee",
  async () => {
    const { data: employee } = FIND_EMPLOYEES();
    return employee.findAllActiveEmployee;
  }
);

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    returnEmployee: (state, action: PayloadAction<UpdateEmployee[]>) => {
      state.employee = action.payload;
    },
    updateNewEmployee: (state, action: PayloadAction<UpdateEmployee>) => {
      const newArray = [...state.employee].map((emp) => {
        if (emp.id === action.payload.id) {
          return {
            ...emp,
            ...action.payload,
          };
        }
        return emp;
      });
      state.employee = newArray;
    },
    removeOldEmployee: (state, action: PayloadAction<string>) => {
      const index = state.employee.findIndex(
        (emp) => emp.id === action.payload
      );
      state.employee = state.employee.splice(index, 1);
    },
    pushNewEmployee: (state, action: PayloadAction<UpdateEmployee>) => {
      state.employee = [...state.employee, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEmployee.fulfilled, (state, action) => {
      state.employee = action.payload;
    });
  },
});

export const {
  returnEmployee,
  updateNewEmployee,
  removeOldEmployee,
  pushNewEmployee,
} = employeeSlice.actions;

export const selectEmployee = (state: RootState) => state.employee;

export default employeeSlice.reducer;
