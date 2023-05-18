import React from "react";
import styled from "styled-components";

const PaymentMethodsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
`;

const PaymentMethodsTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 24px;
  color: #333;
  text-align: center;
`;

const PaymentMethodsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PaymentMethodItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const PaymentMethodIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 16px;
`;

const PaymentMethodName = styled.p`
  font-size: 16px;
  color: #555;
`;

const PaymentMethodsPage = () => {
  return (
    <PaymentMethodsContainer>
      <PaymentMethodsTitle>Payment Methods</PaymentMethodsTitle>

      <PaymentMethodsList>
        <PaymentMethodItem>
          {/* <PaymentMethodIcon src="/images/card-icon.png" alt="Card Payment" /> */}
          <PaymentMethodName>Card Payment</PaymentMethodName>
        </PaymentMethodItem>

        <PaymentMethodItem>
          {/* <PaymentMethodIcon src="/images/upi-icon.png" alt="UPI Payment" /> */}
          <PaymentMethodName>UPI Payment</PaymentMethodName>
        </PaymentMethodItem>

        {/* Add more payment methods as needed */}
      </PaymentMethodsList>
    </PaymentMethodsContainer>
  );
};

export default PaymentMethodsPage;
