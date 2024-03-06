import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PaymentSuccess = () => {
  return (
    <PaymentSuccessContainer>
      <h2>You order is confirmed now</h2>
      <div className="links">
        <Link to={"/orders"}>Click here to go Order page</Link>
        <Link to={"/"}>Click here to go home page</Link>
      </div>
    </PaymentSuccessContainer>
  );
};

const PaymentSuccessContainer = styled.div`
  background-color: #d8d2d2;
  min-height: 30em;
  display: flex;
  flex-direction: column;
  padding: 2em 4em;
  font-family: "Hind";
  h2 {
    font-weight: 600;
    font-size: 2rem;
  }
  a {
    font-size: 1.2rem;
    &:hover {
      color: #07f5f5;
    }
  }

  .links {
    display: flex;
    flex-direction: column;
  }
`;
export default PaymentSuccess;
