import {
  gql,
  OperationVariables,
  QueryResult,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";

export const FIND_DEPARTMENT = () => {
  const query = gql`
    {
      department: findAllActiveDepartment {
        name
        code
      }
    }
  `;
  return useQuery(query);
};
