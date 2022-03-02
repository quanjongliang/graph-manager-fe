import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import dashboardReducer from "../features/dashboard/dashBoardSlice";
import departmentReducer from "../features/department/departmentSlice";
import employeeReducer from "../features/employee/employeeSlice";
import searchKeyReducer from "../features/searchKey/searchKeySplice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    dashboard: dashboardReducer,
    department: departmentReducer,
    employee: employeeReducer,
    searchKey: searchKeyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
