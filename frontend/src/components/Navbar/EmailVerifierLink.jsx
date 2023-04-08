import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const EmailVerifierLink = () => {
  return (
    <VerifyLinkContainer>
      <Link to="/verify-account">
        Your account is not activated. Activate you account.
      </Link>
    </VerifyLinkContainer>
  );
};

const VerifyLinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.1em;
  background-color: #d40a0a;
  a {
    color: black;
    :hover {
      text-decoration: underline;
    }
  }
`;
export default EmailVerifierLink;
