import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import registerImage from "../../assets/signup.jpg";
import {
  Input,
  InputContainer,
  Lable,
  RegisterContainer,
  ResgisterFormContainer,
  SubmitButton,
} from "./register.styled";

const Register = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    name: "",
    mobile: "",
    password: "",
    cnfPassword: "",
  });

  const handleFormValueChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
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
                value={formValue.email}
                name="email"
                onChange={handleFormValueChange}
              />
            </InputContainer>

            <InputContainer>
              <Lable>Name</Lable>
              <Input
                type="text"
                placeholder="Enter your name"
                value={formValue.name}
                name="name"
                onChange={handleFormValueChange}
              />
            </InputContainer>

            <InputContainer>
              <Lable>Mobile Number</Lable>
              <Input
                type="phone"
                placeholder="Enter your mobile number"
                value={formValue.mobile}
                name="mobile"
                onChange={handleFormValueChange}
              />
            </InputContainer>
            <InputContainer>
              <Lable>Password</Lable>
              <Input
                type="password"
                placeholder="Enter your password"
                value={formValue.password}
                name="password"
                onChange={handleFormValueChange}
              />
            </InputContainer>

            <InputContainer>
              <Lable>Confirm Password</Lable>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={formValue.cnfPassword}
                name="cnfPassword"
                onChange={handleFormValueChange}
              />
            </InputContainer>

            <SubmitButton>
              <span>Register</span>
            </SubmitButton>

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
