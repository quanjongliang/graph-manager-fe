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

export interface SearchKeyState {
  searchKey: string;
}

const initialState: SearchKeyState = {
  searchKey: "",
};

export const searchKeySlice = createSlice({
  name: "searchKey",
  initialState,
  reducers: {
    setKeySearch: (state, action: PayloadAction<string>) => {
      state.searchKey = action.payload;
    },
  },
});

export const { setKeySearch } = searchKeySlice.actions;

export const selectSearchKey = (state: RootState) => state.searchKey;

export default searchKeySlice.reducer;
