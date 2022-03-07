import { useMutation } from "@apollo/client";
import { Button, Input, Select, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CREATE_EMPLOYEE, FIND_DEPARTMENT } from "../../api";
import { useAppDispatch } from "../../app/hooks";
import { pushNewEmployee } from "../../features";
import {
  DateKey,
  EmployeeKey,
  UpdateEmployeeWithoutId,
} from "../../interfaces";
import "./createEmployee.scss";
interface Props {
  isOpen: boolean;
  handleIsOpen: () => void;
}

export const CreateEmployee = (props: Props) => {
  const { isOpen, handleIsOpen } = props;
  const toast = useToast();
  const [employee, setEmployee] = useState<UpdateEmployeeWithoutId>();
  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const dispatch = useAppDispatch();
  const { data } = FIND_DEPARTMENT();
  const [createEmployee] = useMutation(CREATE_EMPLOYEE);
  const [department, setDepartment] = useState([
    {
      name: "",
    },
  ]);
  useEffect(() => {
    if (data && data.department) {
      setDepartment(data.department);
    }
  });

  const handleInputEmployee = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: EmployeeKey
  ) => {
    setEmployee((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleInputDate = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: DateKey
  ) => {
    setDate((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleChangeDepartment = (e: React.FormEvent<HTMLSelectElement>) => {
    setEmployee((prev) => ({ ...prev, departmentName: e.currentTarget.value }));
  };
  const submitCreateEmployee = async () => {
    const { day, month, year } = date;
    const dateOfBirth = new Date(`${month}/${day}/${year}`);
    if (!employee?.firstName) {
      toast({
        title: "Please enter first name",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const { data, errors } = await createEmployee({
        variables: {
          firstName: employee?.firstName,
          lastName: employee?.lastName,
          departmentName: employee?.departmentName,
          title: employee?.title,
          dateOfBirth: dateOfBirth,
        },
      });
      dispatch(pushNewEmployee(data.createEmployee));
      toast({
        title: "Employee created.",
        description: "We've created new employee.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      handleIsOpen();
    }
  };
  return (
    <div className={`create-employee ${isOpen ? "open" : ""}`}>
      <div className="create-employee-container">
        <div className="create-employee-container-modal">
          <div
            className="create-employee-container-modal-header"
            onClick={handleIsOpen}
          >
            <div>
              <h1>Create New Employee</h1>
            </div>
            <AiOutlineCloseCircle size="30px" />
          </div>
          <div className="create-employee-container-modal-form">
            <p>First name</p>
            <Input
              variant="flushed"
              value={employee?.firstName}
              onChange={(e) => handleInputEmployee(e, EmployeeKey.FIRST_NAME)}
            />
            <p>Last name</p>
            <Input
              variant="flushed"
              value={employee?.lastName}
              onChange={(e) => handleInputEmployee(e, EmployeeKey.LAST_NAME)}
            />
            <p>Title</p>
            <Input
              variant="flushed"
              value={employee?.title}
              onChange={(e) => handleInputEmployee(e, EmployeeKey.TITLE)}
            />
            <p>Department </p>

            <Select
              placeholder="Select department"
              onChange={handleChangeDepartment}
            >
              {[...department].map((dep, ind) => (
                <option value={dep.name} key={ind}>
                  {dep.name}
                </option>
              ))}
            </Select>
            <div className="create-employee-container-modal-form-date">
              <div className="form-day">
                <p>Day</p>
                <Input
                  variant="flushed"
                  value={date?.day}
                  onChange={(e) => handleInputDate(e, DateKey.DAY)}
                />
              </div>
              <div className="form-month">
                <p>Month</p>
                <Input
                  variant="flushed"
                  value={date?.month}
                  onChange={(e) => handleInputDate(e, DateKey.MONTH)}
                />
              </div>
              <div className="form-year">
                <p>Year</p>
                <Input
                  variant="flushed"
                  value={date?.year}
                  onChange={(e) => handleInputDate(e, DateKey.YEAR)}
                />
              </div>
            </div>
          </div>
          <Button onClick={submitCreateEmployee}>Create</Button>
        </div>
      </div>
    </div>
  );
};
