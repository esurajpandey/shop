
import styled from "styled-components";

export const OtpVerifyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #23aa8f;
  height: 100%;
`;

export const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  h2 {
    font-size: 1.2rem;
  }

  span {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const OtpFormContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .otp-value-conatainer {
    input {
      padding: 0.6em;
      width: 8em;
      outline: 0;
      border-radius: 8px;
      :focus {
        outline: 0;
      }
    }
  }
`;

export const OtpMainConatiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-block: 3em;
  border-radius: 25px;
  height: 100%;

  box-shadow: -1px 3px 38px 8px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -1px 3px 38px 8px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 3px 38px 8px rgba(0, 0, 0, 0.75);

  .right-otp-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    /* border: 1px solid red; */
    height: 100%;
    gap: 1rem;
    .otp-heading {
      font-family: "Alkatra";
    }
  }
  .left-otp-container {
    /* border: 1px solid blue; */
    img {
      width: 25rem;
      height: 23rem;
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;
    }
  }
`;
