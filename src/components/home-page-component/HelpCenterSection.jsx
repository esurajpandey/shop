import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HelpCenterSection = () => {
  const navigate = useNavigate();
  return (
    <HelpCenterContainer>
      <div className="left-help-center">
        <div className="hlp-top-text">Need Help? Check Out Our Help Center</div>
        <div className="hlp-para">
          Need Help? Check Out Our Help Center I'm a paragraph. Click here to
          add your own text and edit me. Let your users get to know you.
        </div>
        <div className="hlp-btns">
          <button onClick={() => navigate("/help")}>Go to help center</button>
        </div>
      </div>
      <div className="right-img-container">
        <img
          src="https://res.cloudinary.com/durmhsdmz/image/upload/v1682260229/c22c23_de5cbbefa9104fc1a1604ea146ea523amv2_neluju.jpg"
          alt=""
        />
      </div>
    </HelpCenterContainer>
  );
};
const HelpCenterContainer = styled.div`
  /* min-width: 80vw; */
  display: flex;
  align-items: center;
  min-height: 12em;
  margin: 0.8em 3em;
  margin-right: 4.5em;

  .left-help-center {
    display: flex;
    flex-direction: column;
    color: white;
    background-color: #000000;
    min-height: 30em;
    width: 50%;
    align-content: center;
    justify-content: center;
    padding: 3rem;
    gap: 0.5rem;
  }

  .right-img-container {
    display: flex;
    align-items: center;
    width: 50%;
    img {
      width: 40em;
      height: 30em;
    }
  }
  .hlp-top-text {
    font-size: 1.5rem;
    font-weight: 600;
    font-family: "Hind";
  }

  .hlp-para {
    font-size: 0.9rem;
    font-family: "Poppins";
  }
  .hlp-btns {
    font-family: "Poppins";
    button {
      font-family: "Poppins";
      padding: 0.4em 2em;
      background-color: #751fff;
      font-size: 1.2rem;
      color: white;
      display: flex;
      align-items: center;
      border-radius: 2.5em;
      transition: 300ms ease-in-out;
      outline: 1px solid transparent;
      &:hover {
        outline: 1px solid transparent;
        background-color: white;
        color: black;
      }
    }
  }

  @media (max-width: 600px){
    max-width: 412px !important;
    overflow: hidden;
    margin: 0.8em 2.5em;
    flex-direction: column;

    .left-help-center{
      width: 100%;
    }
    .right-img-container{
      width: 100%;
    }
    .hlp-btns{
      margin-top: 2em;
    }
  }
`;

export default HelpCenterSection;
