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
import { ChangePasswordSchema } from "../../../validation/UserValidation";
import { makeChangePassword } from "../../../api/User";
const ChangePassword = () => {
  const toast = useToast();

  const submitForm = async (values, action) => {
    try {
      const data = await makeChangePassword(values);

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
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: submitForm,
  });
  return (
    <AddressContainer>
      <div className="title">Change your password</div>
      <AddressForm>
        <div className="address-input-container">
          <InputContainer>
            <LabelText>Current Password</LabelText>
            <InputBox
              value={values.oldPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              name="oldPassword"
              type="password"
              placeholder="Enter current password"
              disabled={isSubmitting}
            />
            {errors?.oldPassword && touched.oldPassword ? (
              <span className="error-class">{errors.oldPassword}</span>
            ) : (
              <></>
            )}
          </InputContainer>
          <InputContainer>
            <LabelText>New Password</LabelText>
            <InputBox
              type="password"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              name="newPassword"
              placeholder="Enter new password"
              disabled={isSubmitting}
            />
            {errors?.newPassword && touched.newPassword ? (
              <span className="error-class">{errors.newPassword}</span>
            ) : (
              <></>
            )}
          </InputContainer>
          <InputContainer>
            <LabelText>Confirm Password</LabelText>
            <InputBox
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              name="confirmPassword"
              type="password"
              placeholder=" Confirm your new password"
              disabled={isSubmitting}
            />
            {errors?.confirmPassword && touched.confirmPassword ? (
              <span className="error-class">{errors.confirmPassword}</span>
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
            Change password
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
};

export default ChangePassword;
