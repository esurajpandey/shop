import React from "react";
import styled from "styled-components";

const HelpContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
`;

const HelpTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 16px;
`;

const HelpSection = styled.div`
  margin-bottom: 32px;
`;

const HelpHeading = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

const HelpContent = styled.p`
  font-size: 16px;
`;

const HelpPage = () => {
  return (
    <HelpContainer>
      <HelpTitle>Help Center</HelpTitle>

      <HelpSection>
        <HelpHeading>How to Login</HelpHeading>
        <HelpContent>
          To login to your account, follow these steps:
          <ol>
            <li>Go to the login page</li>
            <li>Enter your email and password</li>
            <li>Click on the "Login" button</li>
          </ol>
        </HelpContent>
      </HelpSection>

      <HelpSection>
        <HelpHeading>How to Buy Using Cash on Delivery</HelpHeading>
        <HelpContent>
          To buy a product using cash on delivery, follow these steps:
          <ol>
            <li>Select the desired product and add it to your cart</li>
            <li>Go to the checkout page</li>
            <li>Choose the "Cash on Delivery" option as your payment method</li>
            <li>Provide the necessary delivery details</li>
            <li>Click on the "Place Order" button</li>
          </ol>
        </HelpContent>
      </HelpSection>

      <HelpSection>
        <HelpHeading>How to Buy Using Online Payment (PhonePe)</HelpHeading>
        <HelpContent>
          To buy a product using PhonePe or any other online payment method,
          follow these steps:
          <ol>
            <li>Select the desired product and add it to your cart</li>
            <li>Go to the checkout page</li>
            <li>Choose the "Online Payment" option</li>
            <li>Select PhonePe as your payment method</li>
            <li>Follow the on-screen instructions to complete the payment</li>
            <li>Click on the "Place Order" button</li>
          </ol>
        </HelpContent>
      </HelpSection>

      <HelpSection>
        <HelpHeading>How to Buy Using Card Payment</HelpHeading>
        <HelpContent>
          To buy a product using a card payment, follow these steps:
          <ol>
            <li>Select the desired product and add it to your cart</li>
            <li>Go to the checkout page</li>
            <li>Choose the "Online Payment" option</li>
            <li>Select "Card Payment" as your payment method</li>
            <li>Enter your card details (card number, expiry date, CVV)</li>
            <li>Click on the "Place Order" button</li>
          </ol>
        </HelpContent>
      </HelpSection>

      <HelpSection>
        <HelpHeading>How to Reset Password</HelpHeading>
        <HelpContent>
          To reset your password using email with OTP, follow these steps:
          <ol>
            <li>Go to the login page</li>
            <li>Click on the "Forgot Password" link</li>
            <li>Enter your email address</li>
            <li>Click on the "Send OTP" button</li>
            <li>Check your email for the OTP (One-Time Password)</li>
            <li>Enter the OTP and your new password</li>
            <li>Click on the "Reset Password" button</li>
          </ol>
        </HelpContent>
      </HelpSection>
    </HelpContainer>
  );
};

export default HelpPage;
