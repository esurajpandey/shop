import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineCodepen } from "react-icons/ai";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toast = useToast();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/api/login", { email, password })
      .then((response) => {
        // TODO: Handle successful login
      })
      .catch((error) => {
        setError("Invalid email or password");
        toast({
          title: "Error Occured",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      });
  };

  return (
    <LoginContainer>
      <div className="form-container">
        <AiOutlineCodepen fontSize="2rem" />
        <h1>Login</h1>
        <LoginForm onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="input-box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <LoginButton type="submit">
            <span>Login</span>
          </LoginButton>
          <RegisterLink>
            Create new account
            <Link to="/register">Register</Link>
          </RegisterLink>
        </LoginForm>
      </div>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  padding: 3.3rem;
  font-family: "Anton";
  background: linear-gradient(to right, #b5b6b6, white);
  h1 {
    font-weight: 900;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em;
    background-color: #919b9b;
    border-radius: 3px;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .input-box {
    display: flex;
    flex-direction: column;
    font-family: inherit;
    label {
      font-family: inherit;
      font-size: 1rem;
      font-weight: 500;
    }
    input {
      font-size: 1rem;
      color: black;
      /* outline: 1px solid black; */
      width: 24rem;
      padding: 0.35em;
      border: 0;
      border-radius: 2px;
      background: linear-gradient(to right, #dbdada, white);
    }
  }
`;

const LoginButton = styled.button`
  width: 100%;
  background-color: rgba(77, 71, 62, 0.925);
  padding: 0.4rem;
  font-family: inherit;
  border: 0;
  outline: 0;
  cursor: pointer;
  border-radius: 2px;
  span {
    font-family: inherit;
    font-size: 1.2rem;
    font-weight: 700;
    color: white;
  }
  :hover {
    border: 0;
    outline: 0;
    background: linear-gradient(to right, #06ad76, #0074d9);
  }

  :focus {
    border: 0;
    outline: 0;
  }
`;

const RegisterLink = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  word-spacing: 0.09rem;
  a {
    :hover {
      text-decoration: underline;
      color: #14aa23;
    }
  }
`;
export default Login;
