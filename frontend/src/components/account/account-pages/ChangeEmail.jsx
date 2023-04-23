import React from "react";

import {
  AddressContainer,
  AddressForm,
  InputContainer,
  InputBox,
  LabelText,
} from "./MyAddress";
import { Button, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { ChangeEmailSchema } from "../../../validation/UserValidation";
import { makeChangeEmail } from "../../../api/User";
function ChangeEmail() {
  const toast = useToast();

  const submitForm = async (values, action) => {
    try {
      const data = await makeChangeEmail(values);

      toast({
        title: data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      action.resetForm();
    }
  };

  const {
    handleSubmit,
    isSubmitting,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    handleReset,
  } = useFormik({
    initialValues: {
      newEmail: "",
      password: "",
    },
    validationSchema: ChangeEmailSchema,
    onSubmit: submitForm,
  });
  return (
    <AddressContainer>
      <div className="title">Change your email</div>
      <AddressForm>
        <div className="address-input-container">
          <InputContainer>
            <LabelText>Current Email</LabelText>
            <InputBox
              value={values.newEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              name="newEmail"
              type="email"
              placeholder="Enter new email"
              disabled={isSubmitting}
            />
            {errors?.newEmail && touched.newEmail ? (
              <span className="error-class">{errors.newEmail}</span>
            ) : (
              <></>
            )}
          </InputContainer>
          <InputContainer>
            <LabelText>Password</LabelText>
            <InputBox
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name="password"
              type="password"
              placeholder="Enter your password"
              disabled={isSubmitting}
            />
            {errors?.password && touched.password ? (
              <span className="error-class">{errors.password}</span>
            ) : (
              <></>
            )}
          </InputContainer>
        </div>
        <div className="address-submit-container">
          <Button
            colorScheme="telegram"
            width={"10em"}
            type="submit"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Change email
          </Button>
          <Button
            colorScheme="yellow"
            width={"10em"}
            type="reset"
            onClick={handleReset}
            isLoading={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </AddressForm>
    </AddressContainer>
  );
}

export default ChangeEmail;
