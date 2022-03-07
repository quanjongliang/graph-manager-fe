import { useMutation } from "@apollo/client";
import { Button, Input, Select, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { UPDATE_EMPLOYEE } from "../../api";
import { useAppDispatch } from "../../app/hooks";
import { updateNewEmployee } from "../../features";
import { EmployeeKey, UpdateEmployee } from "../../interfaces";
import "./editEmployee.scss";
interface Props {
  isOpen: boolean;
  employee: UpdateEmployee;
  department: any[];
  handleOpen: () => void;
}

export const EditEmployee = (props: Props) => {
  const { isOpen, employee, handleOpen, department } = props;
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [employeeUpdate, setEmployeeUpdate] = useState<any>({ ...employee });
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
  useEffect(() => {
    setEmployeeUpdate(employee);
  }, [employee]);

  const handleInputEmployee = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: EmployeeKey
  ) => {
    setEmployeeUpdate((prev: any) => ({ ...prev, [key]: e.target.value }));
  };

  const handleChangeDepartment = (e: React.FormEvent<HTMLSelectElement>) => {
    const changeDepartment = {
      name: e.currentTarget.value,
    };
    setEmployeeUpdate((prev: any) => ({
      ...prev,
      department: changeDepartment,
    }));
  };

  const submitUpdateEmployee = async () => {
    const res = {
      id: employeeUpdate.id,
      departmentName: employeeUpdate.department.name,
      title: employeeUpdate.title,
      firstName: employeeUpdate.firstName,
      lastName: employeeUpdate.lastName,
    };
    dispatch(
      updateNewEmployee({
        ...res,
        department: {
          name: res.departmentName,
        },
      })
    );
    await updateEmployee({
      variables: res,
    });
    toast({
      title: "Employee edited.",
      description: "We've edited this employee.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    handleOpen();
  };

  return (
    <div className={`edit-employee ${isOpen ? "open" : ""} `}>
      <div className="edit-employee-container">
        <div className="edit-employee-container-model">
          <div
            className="edit-employee-container-model-close"
            onClick={handleOpen}
          >
            <div>
              <h1>Update Employee</h1>
            </div>
            <AiOutlineCloseCircle size="40px" />
          </div>
          <div className="edit-employee-container-model-form">
            <p>First Name</p>
            <Input
              variant="flushed"
              value={employeeUpdate?.firstName || ""}
              onChange={(e) => handleInputEmployee(e, EmployeeKey.FIRST_NAME)}
            />
            <p>Last Name</p>
            <Input
              variant="flushed"
              value={employeeUpdate?.lastName || ""}
              onChange={(e) => handleInputEmployee(e, EmployeeKey.LAST_NAME)}
            />
            <p>Title</p>
            <Input
              variant="flushed"
              value={employeeUpdate?.title || ""}
              onChange={(e) => handleInputEmployee(e, EmployeeKey.TITLE)}
            />
            <p>Department Name</p>
            <Select onChange={handleChangeDepartment}>
              <option value={employee?.department?.name}>
                {employee?.department?.name}
              </option>
              {[...department]
                .filter((dep) => dep.name !== employee?.department?.name)
                .map((dep, ind) => (
                  <option value={dep.name} key={ind}>
                    {dep.name}
                  </option>
                ))}
            </Select>
          </div>
          <div className="edit-employee-container-model-submit">
            <Button colorScheme="teal" size="lg" onClick={submitUpdateEmployee}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
