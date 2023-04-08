import styled from "styled-components";
export const SubmitButton = styled.button`
  border: 0;
  outline: 1px solid black;
  border-radius: 2px;
  font-family: "Roboto Mono";
  padding: 0.4em;
  margin: 0.3rem 0;
  background-color: #3c4a66;
  outline: 0;

  span {
    font-size: 1rem;
    font-weight: 700;
    color: white;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto Mono";
`;
export const Lable = styled.label`
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

export const Input = styled.input`
  font-family: inherit;
  font-size: 1rem;
  padding: 0.4em;
  width: 24rem;
  border-radius: 3px;
  :focus {
    border: 0;
    outline: none;
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
    font-family: "Roboto Mono";
    a {
      color: blue;
    }
  }
`;
export const RegisterContainer = styled.div`
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: #93a2ac;

  .main-container {
    /* padding: 0.8rem 2rem; */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-radius: 3px;
    margin-block: 2em;
    border: 1px solid #3c4a66;
    border-radius: 25px;

    box-shadow: 9px 12px 17px 6px rgba(0, 0, 0, 0.79);
    -webkit-box-shadow: 9px 12px 17px 6px rgba(0, 0, 0, 0.79);
    -moz-box-shadow: 9px 12px 17px 6px rgba(0, 0, 0, 0.79);
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
    color: white;
    text-shadow: 2px 3px 15px rgba(230, 8, 8, 0.6);
  }
  .register-side-image {
    img {
      width: 28rem;
      height: 31rem;
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