import { useMutation } from "@apollo/client";
import { Button, useToast } from "@chakra-ui/react";
import React from "react";
import { DELETE_EMPLOYEE } from "../../api";
import { useAppDispatch } from "../../app/hooks";
import { removeOldEmployee } from "../../features";
import "./confirmDelete.scss";

interface Props {
  id: string;
  index: number;
  handleOpen: () => void;
}

export const ConfirmDelete = (props: Props) => {
  const { id, handleOpen, index } = props;
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [removeEmployee] = useMutation(DELETE_EMPLOYEE);
  const submitDeleteEmployee = () => {
    handleOpen();
    dispatch(removeOldEmployee(id));
    removeEmployee({ variables: { id } });
    toast({
      title: "Employee deleted.",
      description: "We've deleted this employee.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <div className="confirm-delete">
      <div className="confirm-delete-container">
        <div className="confirm-delete-container-header">
          <b onClick={handleOpen}>Close</b>
        </div>
        <p>Are you sure want to delete?</p>
        <div className="confirm-delete-container-button">
          <Button colorScheme="gray" onClick={handleOpen}>
            No
          </Button>
          <Button colorScheme="pink" onClick={submitDeleteEmployee}>
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};
