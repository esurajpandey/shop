import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
        <h1 className="headng">Register</h1>
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
    </RegisterContainer>
  );
};

const SubmitButton = styled.button`
  border: 0;
  outline: 1px solid black;
  border-radius: 2px;
  font-family: "Roboto Mono";
  padding: 0.2em;
  margin: 0.3rem 0;
  span {
    font-size: 1rem;
    font-weight: 700;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto Mono";
`;
const Lable = styled.label`
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  font-family: inherit;
  font-size: 1rem;
  padding: 0.4em;
  width: 24rem;
  border-radius: 3px;
  :focus {
    border: 0;
    outline: none;
  }
`;
const ResgisterFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0;
  .login-link {
    font-family: "Roboto Mono";
    a {
      color: blue;
    }
  }
`;
const RegisterContainer = styled.div`
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: center;
  margin-block: 2em;

  .main-container {
    padding: 0.8rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #d1e0e0;
    border-radius: 3px;
  }

  .headng {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    font-family: "Roboto Mono";
  }
`;
export default Register;
