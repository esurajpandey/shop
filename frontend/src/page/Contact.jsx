import React from "react";
import styled from "styled-components";

const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  padding: 2rem;
`;

const ContactContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 80%;
  background-color: #f1f1f1;
  border-radius: 8px;
  padding: 40px;
`;

const ShopInfoContainer = styled.div`
  flex: 1;
  margin-right: 40px;
`;

const ShopTitle = styled.h1`
  font-size: 36px;
  margin-bottom: 16px;
`;

const ShopDescription = styled.p`
  font-size: 18px;
  margin-bottom: 32px;
`;

const ShopContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
`;

const ContactFormContainer = styled.div`
  flex: 1;
`;

const ContactForm = styled.form`
  width: 100%;
`;

const ContactLabel = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
`;

const ContactInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ContactTextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ContactButton = styled.button`
  padding: 12px 24px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const ContactUsPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <ContactContainer>
      <ContactContent>
        <ContactFormContainer>
          <ContactForm onSubmit={handleSubmit}>
            <ContactLabel htmlFor="name">Name</ContactLabel>
            <ContactInput type="text" id="name" required />
            <ContactLabel htmlFor="email">Email</ContactLabel>
            <ContactInput type="email" id="email" required />
            <ContactLabel htmlFor="message">Message</ContactLabel>
            <ContactTextArea id="message" rows="6" required></ContactTextArea>
            <ContactButton type="submit">Send Message</ContactButton>
          </ContactForm>
        </ContactFormContainer>
      </ContactContent>
    </ContactContainer>
  );
};

export default ContactUsPage;
