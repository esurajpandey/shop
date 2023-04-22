import styled from "styled-components";


export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Hind";

`;
export const Lable = styled.label`
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  font-family: "Hind";
  font-size: 1rem;
  padding: 0.5em 0.3em;
  width: 24rem;
  border-radius: 3px;
  :focus {
    border: 0;
    outline: none;
  }

  &:active,&:focus{
    box-shadow: 0px 0px 19px -2px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 0px 19px -2px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 19px -2px rgba(0,0,0,0.75);
  }
  @media (max-width: 700px) {
    /* border: 2px solid red;/ */
    width: 22rem;
  }
`;
export const ResgisterFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0;
  .login-link {
    font-family: "Hind";
    a {
      color: blue;
    }
  }
  .input-error{
    border: 2px solid red;
  }
`;
export const RegisterContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #C4DDFF;

  .main-container {
    /* padding: 0.8rem 2rem; */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-radius: 3px;
    margin-block: 2em;
    /* border: 1px solid #3c4a66; */
    border-radius: 25px;

    box-shadow: 0px 0px 19px -2px rgba(127,181,255,0.75);
    -webkit-box-shadow: 0px 0px 19px -2px rgba(127,181,255,0.75);
    -moz-box-shadow: 0px 0px 19px -2px rgba(127,181,255,0.75);
  }

  .register-form {
    padding: 1rem;
    padding-right: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 700px) {
      /* border: 2px solid red;/ */
      width: 25rem;
    }
  }

  .register-text {
    font-family: "Alkatra";
    color: #383838;
    text-shadow: 3px 3px 3px rgba(56,56,56,0.6);
  }
  .register-side-image {
    img {
      width: 28rem;
      /* height: 34rem; */
      min-height: 34rem;
      max-width: 34rem;
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;
      @media (max-width: 700px) {
        display: none;
      }
    }
  }
  .headng {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    font-family: "Roboto Mono";
  }
`;