import { useState, useEffect } from "react";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../assets/login-image.jpg";
import { Input, InputContainer } from "../register/register.styled";
import { Lable, LoginContainer, LoginForm, RegisterLink } from "./login.styled";
import { getLogin } from "../../api/User";
import ForgetPassword from "./ForgetPassword";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      const data = await getLogin({
        email,
        password,
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

      toast({
        title: data?.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      window.location.reload(true);
      setLoading(false);
      navigate("/all");
    } catch (err) {
      console.log(err);
      toast({
        title: err.message,
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
    const userDetails = JSON.parse(localStorage.getItem("user"));
    if (userDetails) {
      setUser(user);
      navigate("/all");
    }
  }, []);

  return (
    !user && (
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
            <button
              style={{
                font: "Hind",
                fontSize: "1rem",
                padding: "0.1em 1em",
                border: "0",
              }}
              className="forget-password"
              onClick={onOpen}
            >
              Forget your password
            </button>
            <ForgetPassword isOpen={isOpen} onClose={onClose} />
          </div>
        </div>
      </LoginContainer>
    )
  );
}

export default Login;
