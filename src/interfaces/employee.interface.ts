export interface UpdateEmployee {
  id: string;
  departmentName?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  department?: {
    name: string;
  };
  dateOfBirth?: Date;
}

export interface UpdateEmployeeWithoutId {
  departmentName?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
}

export enum EmployeeKey {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  TITLE = "title",
  DEPARTMENT_NAME = "departmentName",
}

export enum DateKey {
  DAY = "day",
  MONTH = "month",
  YEAR = "year",
}
