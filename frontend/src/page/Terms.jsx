import React from "react";
import styled, { keyframes } from "styled-components";

const TermsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TermsTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 24px;
  color: #333;
  text-align: center;
`;

const ContentWrapper = styled.div`
  margin-bottom: 32px;
`;

const fadeAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AnimatedContent = styled.p`
  font-size: 16px;
  color: #777;
  animation: ${fadeAnimation} 1s ease-in-out;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 16px;
  color: #333;
`;

const HighlightedText = styled.span`
  color: #ff6363;
  font-weight: bold;
`;

const TermsPage = () => {
  return (
    <TermsContainer>
      <TermsTitle>
        Terms and Conditions
        <br />
        for Sathieh Mill Stores
      </TermsTitle>

      <ContentWrapper>
        <SectionTitle>Welcome</SectionTitle>
        <AnimatedContent>
          Thank you for visiting Sathieh Mill Stores. By accessing or using our
          website, you agree to be bound by these Terms and Conditions. Please
          read them carefully. If you do not agree with any part of these Terms
          and Conditions, please do not use our website.
        </AnimatedContent>
      </ContentWrapper>

      <ContentWrapper>
        <SectionTitle>Modifications</SectionTitle>
        <AnimatedContent>
          We reserve the right to modify, update, or replace any part of these
          Terms and Conditions at our sole discretion. It is your responsibility
          to check this page periodically for changes. Your continued use of our
          website following the posting of any changes constitutes acceptance of
          those changes.
        </AnimatedContent>
      </ContentWrapper>

      <ContentWrapper>
        <SectionTitle>Intellectual Property</SectionTitle>
        <AnimatedContent>
          All content, trademarks, logos, and intellectual property displayed on
          our website are the property of Sathieh Mill Stores and are protected
          by applicable copyright laws. You may not use, reproduce, or
          distribute any of the content without our prior written permission.
        </AnimatedContent>
      </ContentWrapper>

      <ContentWrapper>
        <SectionTitle>User Conduct</SectionTitle>
        <AnimatedContent>
          You agree to use our website for lawful purposes and in a manner that
          does not infringe upon the rights of others. You are solely
          responsible for any content you post or transmit on our website. We
          reserve the right to remove any content that violates these Terms and
          Conditions.
        </AnimatedContent>
      </ContentWrapper>

      <ContentWrapper>
        <SectionTitle>Disclaimer</SectionTitle>
        <AnimatedContent>
          Our website is provided on an "as is" basis. We make no
          representations or warranties of any kind, express or implied,
          regarding the operation or availability of our website, the accuracy
          of the information, or the products or services offered. Your use of
          our website is at your sole risk.
        </AnimatedContent>
      </ContentWrapper>
    </TermsContainer>
  );
};

export default TermsPage;
