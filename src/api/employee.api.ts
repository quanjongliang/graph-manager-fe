import { gql, useQuery } from "@apollo/client";

export const FIND_EMPLOYEES = () => {
  const query = gql`
    {
      findAllActiveEmployee {
        id
        firstName
        lastName
        title
        dateOfBirth
        department {
          name
        }
      }
    }
  `;
  return useQuery(query);
};
export const FIND_EMPLOYEES_BY_NAME = gql`
  query ($name: String!) {
    findEmployeesByName(name: $name) {
      firstName
      departmentInformation {
        name
      }
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee(
    $id: String!
    $departmentName: String
    $title: String
    $firstName: String
    $lastName: String
  ) {
    updateEmployee(
      updateEmployeeInput: {
        id: $id
        departmentName: $departmentName
        title: $title
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      firstName
      lastName
      title
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation createEmployee(
    $firstName: String!
    $lastName: String!
    $departmentName: String!
    $title: String!
    $dateOfBirth: DateTime
  ) {
    createEmployee(
      createEmployeeInput: {
        firstName: $firstName
        lastName: $lastName
        departmentName: $departmentName
        title: $title
        dateOfBirth: $dateOfBirth
      }
    ) {
      id
      firstName
      lastName
      dateOfBirth
      title
      department {
        name
        code
      }
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($id: String!) {
    deleteEmployee(id: $id) {
      firstName
      isDeleted
    }
  }
`;
const queryFindByDepartment = gql`
  query ($depName: String!) {
    findAllActiveEmployeeByDepartment(depName: $depName) {
      firstName
      lastName
      title
      id
      department {
        name
      }
    }
  }
`;

export const QUERY_FIND_BY_DEPARTMENT = () => {
  return useQuery(queryFindByDepartment);
};
