import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerImage from "../../assets/signup.jpg";
import {
  Input,
  InputContainer,
  Lable,
  RegisterContainer,
  ResgisterFormContainer,
} from "./register.styled";
import { Button, useToast } from "@chakra-ui/react";
import { registerSchema } from "../../validation/UserValidation";
import { useFormik } from "formik";
import { postRegister } from "../../api/User";

const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmitForm = async (values, action) => {
    try {
      const data = await postRegister(values);
      toast({
        title: data?.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.data.name,
          email: data.data.email,
          token: data.token,
          isEmailVerified: data.data.isEmailVerified,
          type: data.data.type,
        })
      );
      window.location.reload(true);
      return navigate("/");
    } catch (error) {
      toast({
        title: error.message,
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
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    values,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
      cnfPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: handleSubmitForm,
  });

  console.log(errors);
  return (
    <RegisterContainer>
      <div className="main-container">
        <div className="register-side-image">
          <img src={registerImage} alt="" />
        </div>
        <div className="register-form">
          <h2 className="register-text">Sign up</h2>
          <ResgisterFormContainer>
            <InputContainer>
              <Lable>Email</Lable>
              <Input
                type="email"
                placeholder="Enter your email"
                value={values.email}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors?.email && touched.email ? "input-error" : ""}
              />
              {errors?.email && touched.email ? (
                <span className="error-class">{errors.email}</span>
              ) : (
                <></>
              )}
            </InputContainer>

            <InputContainer>
              <Lable>Name</Lable>
              <Input
                type="text"
                placeholder="Enter your name"
                value={values.name}
                name="name"
                id="name"
                onChange={handleChange}
                className={errors?.name ? "input-error" : ""}
              />
              {errors?.name ? (
                <span className="error-class">{errors.name}</span>
              ) : (
                <></>
              )}
            </InputContainer>

            <InputContainer>
              <Lable>Mobile Number</Lable>
              <Input
                type="phone"
                placeholder="Enter your mobile number"
                value={values.mobile}
                name="mobile"
                id="mobile"
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors?.mobile && touched.mobile ? "input-error" : ""
                }
              />
              {errors?.mobile && touched.mobile ? (
                <span className="error-class">{errors.mobile}</span>
              ) : (
                <></>
              )}
            </InputContainer>
            <InputContainer>
              <Lable>Password</Lable>
              <Input
                type="password"
                placeholder="Enter your password"
                value={values.password}
                name="password"
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors?.password && touched.password ? "input-error" : ""
                }
              />
              {errors?.password && touched.password ? (
                <span className="error-class">{errors.password}</span>
              ) : (
                <></>
              )}
            </InputContainer>

            <InputContainer>
              <Lable>Confirm Password</Lable>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={values.cnfPassword}
                name="cnfPassword"
                id="cnfPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors?.cnfPassword && touched.cnfPassword
                    ? "input-error"
                    : ""
                }
              />
              {errors?.cnfPassword && touched.cnfPassword ? (
                <span className="error-class">{errors.cnfPassword}</span>
              ) : (
                <></>
              )}
            </InputContainer>

            <Button
              variant="solid"
              colorScheme="cyan"
              width={"100%"}
              style={{ marginTop: 15 }}
              onClick={handleSubmit}
              isLoading={isSubmitting}
            >
              Register
            </Button>

            <span className="login-link">
              Have an account <Link to="/login">login</Link>
            </span>
          </ResgisterFormContainer>
        </div>
      </div>
    </RegisterContainer>
  );
};

export default Register;
