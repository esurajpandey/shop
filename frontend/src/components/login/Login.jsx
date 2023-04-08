import { useState, useEffect } from "react";
import axios from "axios";
import { Button, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../assets/login-image.jpg";
import {
  Input,
  InputContainer,
  SubmitButton,
} from "../register/register.styled";
import { Lable, LoginContainer, LoginForm, RegisterLink } from "./login.styled";
import styled from "styled-components";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!(email && password)) {
      toast({
        title: "Enter the email and password",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post("/api/user/login", {
        email,
        password,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.data.name,
          email: data.data.email,
          token: data.token,
        })
      );

      toast({
        title: data?.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      navigate("/all");
    } catch (err) {
      console.log(err.response.data);
      toast({
        title: err?.response?.data?.message,
        description: "Inavlid email and password",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.stringify(localStorage.getItem("user"));
    if (user) {
      navigate("/all");
    }
  }, []);

  return (
    <LoginContainer>
      <div className="main-login-container">
        <div className="left-image">
          <img src={loginImage} alt="Login" />
        </div>
        <div className="form-container">
          <h2 className="login-text">Login your account</h2>
          <LoginForm>
            <InputContainer>
              <Lable color="white">Email</Lable>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <Lable>Password</Lable>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputContainer>

            <Button
              variant="solid"
              colorScheme="cyan"
              width={"100%"}
              style={{ marginTop: 15 }}
              onClick={handleSubmit}
              isLoading={loading}
            >
              Login
            </Button>
          </LoginForm>

          <RegisterLink>
            <Link to="/register">Create account</Link>
          </RegisterLink>
        </div>
      </div>
    </LoginContainer>
  );
}

const LoaderEffect = styled.span`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7983ff;
  width: 16px;
  height: 16px;
`;
export default Login;
