import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { ConfirmDelete } from "..";
import { FIND_EMPLOYEES, QUERY_FIND_BY_DEPARTMENT } from "../../api";
import { useAppDispatch } from "../../app/hooks";
import { getEmployee, returnEmployee, setKeySearch } from "../../features";
import { Department, UpdateEmployee } from "../../interfaces";
import { EditEmployee } from "../EditEmployee";
import "./tableEmployee.scss";

interface Props {
  employee: UpdateEmployee[];
  department: Department[];
}

export const TableEmployee = (props: Props) => {
  const result = props;
  const [dashboard, setDashboard] = useState<any>({
    employee: [],
    department: [],
  });
  const dispatch = useAppDispatch();

  const [select, setSelect] = useState({
    isOpen: false,
    department: "",
  });
  const { loading, error, fetchMore } = QUERY_FIND_BY_DEPARTMENT();

  useEffect(() => {
    setDashboard(result);
  }, [result]);

  const [confirmDelete, setConfirmDelete] = useState({
    id: "",
    index: 0,
    delete: false,
  });

  const [editEmployee, setEditEmployee] = useState<any>({
    employee: null,
    isOpenEdit: false,
  });

  const handleEditEmployee = (index: number) => {
    setEditEmployee((prev: any) => ({
      ...prev,
      employee: dashboard.employee[index],
    }));
    handleOpenEdit();
  };

  const handleOpenEdit = () => {
    setEditEmployee((prev: any) => ({
      ...prev,
      isOpenEdit: !prev.isOpenEdit,
    }));
  };
  const handleOpenDelete = (id: string, index: number) => {
    setConfirmDelete({ id, index, delete: true });
  };

  const handleOpenDeleteModal = () => {
    setConfirmDelete({ ...confirmDelete, delete: !confirmDelete.delete });
  };

  const openTh = () => {
    setSelect((prev: any) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const setSelectDepartment = async (name: string) => {
    const { data } = await fetchMore({
      variables: {
        depName: name,
      },
    });
    dispatch(returnEmployee(data.findAllActiveEmployeeByDepartment));
    dispatch(setKeySearch(name));
  };

  const renderDateOfBirth = (date?: Date): string => {
    if (date) {
      return moment(date).format("DD/MM/YYYY");
    }
    return "N/A";
  };

  if (result.employee.length === 0)
    return (
      <div className="table-employee">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Title</Th>
              <Th onClick={openTh}>
                <div className="th-department-option">
                  <p>Department</p>
                  <AiFillCaretDown />
                  {select.isOpen && (
                    <div className="th-department-option-select">
                      {/* <div
                        onClick={getAllEmployees}
                        className="th-department-option-select-item"
                      >
                        All
                      </div> */}
                      {[...dashboard.department].map((dep, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectDepartment(dep.name)}
                          className="th-department-option-select-item"
                        >
                          {dep.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>Empty Result</Tbody>
        </Table>
      </div>
    );
  return (
    <div className="table-employee">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Title</Th>
            <Th>Date of Birth</Th>
            <Th onClick={openTh}>
              <div className="th-department-option">
                <p>Department</p>
                <AiFillCaretDown />
                {select.isOpen && (
                  <div className="th-department-option-select">
                    {/* <div
                      onClick={getAllEmployees}
                      className="th-department-option-select-item"
                    >
                      All
                    </div> */}
                    {[...dashboard.department].map((dep, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectDepartment(dep.name)}
                        className="th-department-option-select-item"
                      >
                        {dep.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {[...result.employee].map((d, index) => (
            <Tr key={index}>
              <Td>{d.firstName}</Td>
              <Td>{d.lastName}</Td>
              <Td>{d.title}</Td>
              <Td>{renderDateOfBirth(d.dateOfBirth)}</Td>
              <Td>{d.department?.name || "N/A"}</Td>
              <Td>
                <div className="option-employee">
                  <p
                    className="td-action edit"
                    onClick={() => handleEditEmployee(index)}
                  >
                    Edit
                  </p>
                  <p
                    className="td-action action"
                    onClick={() => handleOpenDelete(d.id, index)}
                  >
                    Delete
                  </p>
                </div>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <EditEmployee
        isOpen={editEmployee.isOpenEdit}
        employee={editEmployee.employee}
        department={dashboard.department}
        handleOpen={handleOpenEdit}
      />
      {confirmDelete.delete && (
        <ConfirmDelete
          id={confirmDelete.id}
          index={confirmDelete.index}
          handleOpen={handleOpenDeleteModal}
        />
      )}
    </div>
  );
};
