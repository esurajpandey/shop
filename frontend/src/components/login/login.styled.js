import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 3.3rem;
  font-family: "Anton";
  background: linear-gradient(to right, #EAFDFC, #C0DEFF);

  .main-login-container {
    display: flex;
    border-radius: 10px;
    box-shadow: 0px 0px 19px -2px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 0px 19px -2px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 19px -2px rgba(0,0,0,0.75);
  }

  .left-image {
    img {
      width: 25em;
      height: 29rem;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
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
    font-family: "Hind";

    .login-text {
      font-family: "Alkatra";
      color: #383838;
      text-shadow: 3px 3px 3px rgba(56,56,56,0.6);
    }
    @media (max-width: 700px) {
      /* border: 2px solid red;/ */
      width: 25rem;
    }
  }

  .forget-password{
    display: flex;
    color : #394867;

    &:hover{
      text-decoration: underline;
      color : #6C9BCF;
    }
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: "Hind";
`;

export const RegisterLink = styled.span`
  word-spacing: 0.09rem;
  margin-top: 1em;
  a {
    color: blue;
    :hover {
      text-decoration: underline;
    }
  }
`;

export const Lable = styled.label`
  font-family: "Hind";
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: black;
`;

