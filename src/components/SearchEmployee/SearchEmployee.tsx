import { gql, useQuery } from "@apollo/client";
import { Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { QUERY_FIND_BY_DEPARTMENT } from "../../api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  returnEmployee,
  selectEmployee,
  selectSearchKey,
} from "../../features";
import "./searchEmployee.scss";
const query = gql`
  query ($name: String!) {
    findEmployeesByName(name: $name) {
      firstName
      lastName
      title
      department {
        name
      }
      departmentInformation {
        name
      }
    }
  }
`;
export const SearchEmployee = () => {
  const [search, setSearch] = useState("");
  const { loading, error, fetchMore } = useQuery(query);
  const { fetchMore: fetchMoreByKey } = QUERY_FIND_BY_DEPARTMENT();
  const dispatch = useAppDispatch();
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };
  const submit = async () => {
    if (search) {
      const { data } = await fetchMore({
        variables: {
          name: search,
        },
      });
      if (data.findEmployeesByName) {
        dispatch(returnEmployee(data.findEmployeesByName));
      }
    }
  };
  const { employee } = useAppSelector(selectEmployee);
  const { searchKey } = useAppSelector(selectSearchKey);
  const handleKeywordKeyPress = async (e: any) => {
    if (e.key == "Enter") {
      if (search) {
        // submit();
        const resultSearch = employee.filter(
          (emp) =>
            emp.firstName?.toLowerCase().includes(search) ||
            emp.lastName?.includes(search)
        );
        dispatch(returnEmployee(resultSearch));
      } else {
        const { data } = await fetchMoreByKey({
          variables: {
            depName: searchKey,
          },
        });
        dispatch(returnEmployee(data.findAllActiveEmployeeByDepartment));
      }
    }
  };
  return (
    <div className="search-employee">
      <div className="search-employee container">
        <Input
          type="text"
          placeholder="Enter name employee"
          onChange={handleChangeText}
          onKeyPress={handleKeywordKeyPress}
        />
      </div>
    </div>
  );
};
