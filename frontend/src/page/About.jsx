import React from "react";
import styled from "styled-components";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const StoreName = styled.h1`
  font-size: 32px;
  margin-bottom: 16px;
`;

const StoreDescription = styled.p`
  font-size: 18px;
  text-align: center;
  margin-bottom: 32px;
`;

const AboutUsContent = styled.div`
  width: 800px;
  text-align: center;
`;

const AboutHeading = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

const AboutText = styled.p`
  font-size: 16px;
  margin-bottom: 32px;
`;

const AboutPage = () => {
  return (
    <AboutContainer>
      <StoreName>Sathieh Mill Stores</StoreName>
      <StoreDescription>
        Online Electrical and Electronics Store
      </StoreDescription>

      <AboutUsContent>
        <AboutHeading>About Us</AboutHeading>
        <AboutText>
          Sathieh Mill Stores is an online store that specializes in providing a
          wide range of electrical and electronics products. With years of
          experience in the industry, we are committed to offering high-quality
          products and exceptional customer service to meet the needs of our
          valued customers.
        </AboutText>
        <AboutText>
          At Sathieh Mill Stores, we strive to bring you the latest and most
          innovative electrical and electronics products from renowned brands.
          Our carefully curated collection includes items such as lighting
          fixtures, home appliances, power tools, electronic components, and
          much more. Whether you are a DIY enthusiast or a professional, we have
          the right products to cater to your requirements.
        </AboutText>
        <AboutText>
          We take pride in our seamless online shopping experience, offering
          easy navigation, secure payment options, and prompt delivery services.
          Our team of knowledgeable experts is always ready to assist you with
          any queries or concerns you may have, ensuring a smooth and
          satisfactory shopping experience.
        </AboutText>
        <AboutText>
          Thank you for choosing Sathieh Mill Stores as your go-to destination
          for all your electrical and electronics needs. We look forward to
          serving you and exceeding your expectations.
        </AboutText>
      </AboutUsContent>
    </AboutContainer>
  );
};

export default AboutPage;
