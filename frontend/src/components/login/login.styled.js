import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  padding: 3.3rem;
  font-family: "Anton";
  background: linear-gradient(to right, #9434f7, #3a259a);

  .main-login-container {
    display: flex;
    border-radius: 25px;
    box-shadow: -1px 3px 38px 8px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: -1px 3px 38px 8px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -1px 3px 38px 8px rgba(0, 0, 0, 0.75);
  }

  .left-image {
    img {
      width: 25em;
      height: 27rem;
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;
    }

    @media (max-width: 700px) {
      display: none;
    }
  }

  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em;
    border-radius: 3px;
    margin-block: 1.5rem;

    .login-text {
      font-family: "Alkatra";
      color: white;
      text-shadow: 2px 3px 15px rgba(230, 8, 8, 0.6);
    }
    @media (max-width: 700px) {
      /* border: 2px solid red;/ */
      width: 25rem;
    }
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const RegisterLink = styled.span`
  word-spacing: 0.09rem;
  margin-top: 1em;
  a {
    color: white;
    :hover {
      text-decoration: underline;
    }
  }
`;

export const Lable = styled.label`
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: white;
`;

