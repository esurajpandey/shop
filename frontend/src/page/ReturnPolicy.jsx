import React from "react";
import styled from "styled-components";

const ReturnPolicyContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ReturnPolicyTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 24px;
  color: #333;
`;

const ReturnPolicySection = styled.div`
  margin-bottom: 32px;
`;

const ReturnPolicyHeading = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
  color: #555;
`;

const ReturnPolicyContent = styled.p`
  font-size: 16px;
  color: #777;
`;

const ReturnPolicyPage = () => {
  return (
    <ReturnPolicyContainer>
      <ReturnPolicyTitle>Return Policy</ReturnPolicyTitle>

      <ReturnPolicySection>
        <ReturnPolicyHeading>30-Day Return Policy</ReturnPolicyHeading>
        <ReturnPolicyContent>
          We offer a 30-day return policy for most of our products. If you are
          not satisfied with your purchase, you can return it within 30 days
          from the date of delivery for a full refund or replacement.
        </ReturnPolicyContent>
      </ReturnPolicySection>

      <ReturnPolicySection>
        <ReturnPolicyHeading>Conditions for Return</ReturnPolicyHeading>
        <ReturnPolicyContent>
          To be eligible for a return, the product must be unused, undamaged,
          and in the same condition as you received it. It should be in its
          original packaging with all the tags and accessories intact.
        </ReturnPolicyContent>
      </ReturnPolicySection>

      <ReturnPolicySection>
        <ReturnPolicyHeading>Return Process</ReturnPolicyHeading>
        <ReturnPolicyContent>
          To initiate a return, please follow these steps:
          <ol>
            <li>Log in to your account and go to the "Orders" section</li>
            <li>Find the order containing the product you wish to return</li>
            <li>Select the product and click on the "Return" button</li>
            <li>Fill out the return request form with the required details</li>
            <li>Submit the form and wait for our confirmation</li>
            <li>
              Once your return request is approved, our delivery personnel will
              pick up the product from your provided address
            </li>
            <li>
              After receiving and verifying the returned product, we will
              initiate the refund process
            </li>
          </ol>
        </ReturnPolicyContent>
      </ReturnPolicySection>

      <ReturnPolicySection>
        <ReturnPolicyHeading>Refund Process</ReturnPolicyHeading>
        <ReturnPolicyContent>
          After the returned product is received and verified, we will initiate
          the refund process. The refund will be processed through the original
          payment method used during the purchase. It may take up to 7-10
          business days for the refund to reflect in your account.
        </ReturnPolicyContent>
      </ReturnPolicySection>

      <ReturnPolicySection>
        <ReturnPolicyHeading>Exceptions</ReturnPolicyHeading>
        <ReturnPolicyContent>
          Please note that certain products are not eligible for return, such as
          perishable items, customized products, and products with hygiene
          concerns. Additionally, some categories may have specific return
          policies due to the nature of the product.
        </ReturnPolicyContent>
      </ReturnPolicySection>
    </ReturnPolicyContainer>
  );
};

export default ReturnPolicyPage;
