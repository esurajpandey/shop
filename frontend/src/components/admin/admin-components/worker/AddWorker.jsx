import React, { useState } from "react";
import { ContainerForAdmin, AddSupplierForm } from "../supplier/AddSupplier";
import { useFormik } from "formik";
import { workerSchema } from "../../../../validation/AdminValidation";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { createWorker, convertCustToWorker } from "../../../../api/Admin";
import styled from "styled-components";

const AddWorker = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [convertWorkerEmail, setConvertWorkerEmail] = useState("");

  const handleSubmitForm = async (values, action) => {
    try {
      const data = await createWorker(values);
      toast({
        title: data?.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      action.resetForm();
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
    }
  };

  const convertCustomerToWorker = async (email, onSuccess) => {
    try {
      if (!email) {
        toast({
          title: "Email is required to add",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });

        return;
      }
      const userData = {
        email,
      };

      const data = await convertCustToWorker(userData);
      toast({
        title: data?.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
    }
  };

  const handleCancel = (action, values) => {
    action.resetForm();
  };

  const {
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    values,
    handleReset,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
    },
    validationSchema: workerSchema,
    onSubmit: handleSubmitForm,
    handleReset: handleCancel,
  });
  return (
    <ContainerForAdmin>
      <div className="add-supplier-title">
        <h2 className="title-heading">Add Worker</h2>
      </div>
      <AddSupplierForm>
        <div className="name-field field">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={values.name}
            onChange={handleChange}
            id="name"
            name="name"
            placeholder="Enter worker name"
            onBlur={handleBlur}
            className={errors?.name && touched.name ? "input-error" : ""}
          />

          {errors.name && touched.name ? <span>{errors.name}</span> : <></>}
        </div>
        <div className="email-field field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            name="email"
            placeholder="Enter supplier email"
            onBlur={handleBlur}
            className={errors?.email && touched.email ? "input-error" : ""}
          />
          {errors.email && touched.email ? <span>{errors.email}</span> : <></>}
        </div>
        <div className="mobile-field field">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="text"
            value={values.mobile}
            onChange={handleChange}
            id="mobile"
            name="mobile"
            placeholder="Enter supplier contact number"
            onBlur={handleBlur}
            className={errors?.mobile && touched.mobile ? "input-error" : ""}
          />
          {errors.mobile && touched.mobile ? (
            <span>{errors.mobile}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="password-field field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            name="password"
            placeholder="Enter a password for worker"
            onBlur={handleBlur}
            className={
              errors?.password && touched.password ? "input-error" : ""
            }
          />
          {errors.password && touched.password ? (
            <span>{errors.password}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="buttons">
          <button
            onClick={handleSubmit}
            type="submit"
            disabled={isSubmitting}
            className={isSubmitting ? "submitting" : ""}
          >
            Submit
          </button>
          <button type="reset" onClick={handleReset} className="cancel-btn">
            Cancel
          </button>
        </div>
      </AddSupplierForm>

      <ConvertUserToWorker>
        {/* <Button mt={4} onClick={onOpen}>
          Open Modal
        </Button> */}
        <span onClick={onOpen} className="user-to-worker">
          Convert customer to worker
        </span>
        <Modal isOpen={isOpen} onClose={onClose} mt={10} isCentered>
          <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(1px) hue-rotate(90deg)"
          />
          <ModalContent>
            <ModalHeader>User email</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Enter email"
                size="md"
                border={"1px solid #a1d4db"}
                _focus={{ border: "1px solid #a3d2d8" }}
                onChange={(e) => setConvertWorkerEmail(e.target.value)}
              />
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() =>
                  convertCustomerToWorker(convertWorkerEmail, onClose)
                }
              >
                Add workeroutline
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ConvertUserToWorker>
    </ContainerForAdmin>
  );
};

const ConvertUserToWorker = styled.div`
  display: flex;
  align-content: center;
  margin-top: 0.5em;
  .user-to-worker {
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.2em 8.8em;
    border-radius: 5px;
    background-color: #95d1cc;
    color: #173f49;
    &:hover {
      background-color: #78c5bf;
    }
  }
`;
export default AddWorker;
