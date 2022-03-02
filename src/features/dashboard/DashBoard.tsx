import React, { useEffect, useState } from "react";
import { SearchEmployee, TableEmployee } from "../../components";
import "./dashBoard.scss";
import { Button } from "@chakra-ui/react";
import { CreateEmployee } from "../../components/CreateEmployee";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { incrementAsync, selectDashboard } from ".";
import { getEmployee, Loading, selectEmployee } from "..";
import { getDepartment, selectDepartment } from "../department";
export const DashBoard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [dashboard, setDashboard] = useState<any>({
    employee: [],
    department: [],
  });

  const { department } = useAppSelector(selectDepartment);
  const { employee } = useAppSelector(selectEmployee);

  useEffect(() => {
    setDashboard({
      department,
      employee,
    });
  }, [department, employee]);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  // if (department.length === 0 || employee.length === 0) return <Loading />;
  return (
    <div className="dash-board">
      <div className="dash-board-container">
        <SearchEmployee />
        <TableEmployee
          department={dashboard.department}
          employee={dashboard.employee}
        />
        <div className="dash-board-container-group-button">
          <Button colorScheme="teal" size="md" onClick={handleIsOpen}>
            Add New Employee
          </Button>
        </div>
      </div>
      <CreateEmployee isOpen={isOpen} handleIsOpen={handleIsOpen} />
    </div>
  );
};
