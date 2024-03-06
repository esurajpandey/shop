import React, { useState } from "react";
import styled from "styled-components";
import { useToast } from "@chakra-ui/react";

const NewLetterSection = () => {
  const [email, setEmail] = useState();
  const toast = useToast({
    duration: 5000,
    isClosable: true,
    position: "top",
    status: "loading",
  });

  const handleSubmit = async () => {
    if (!email) {
      toast({
        title: "Email is required",
        status: "warning",
        position: "top-right",
      });
      return;
    }
    toast({
      title: "You subscribed news letters",
    });
  };

  return (
    <NewLetterFormSectionContainer>
      <div className="top-news-text">
        <span>Newsletter</span>
      </div>
      <div className="middle-top-news">
        Sign up to receive updates on new arrivals and special offers
      </div>
      <div className="news-form">
        <label htmlFor="">Email *</label>
        <div className="input-box">
          <input
            type="text"
            placeholder="Your Email Here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSubmit}>Subscribe</button>
        </div>
      </div>
    </NewLetterFormSectionContainer>
  );
};

const NewLetterFormSectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #751fff;
  min-height: 15em;
  margin: 0.8em 3em;
  margin-right: 4.5em;
  color: white;
  font-family: "Hind";
  .news-form {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    input {
      font-size: 1rem;
      padding: 0.6em 0.8em;
      min-width: 35em;
      border-radius: 2em;
      color: black;
      &:focus {
        outline: 0;
      }
    }
    button {
      background-color: #000000;
      color: white;
      border: 0;
      font-size: 1.1rem;
      font-family: "Poppins";
      padding: 0.6em 2em;
      border-radius: 2rem;
      margin-left: -3em;
    }
  }

  .top-news-text {
    span {
      font-size: 1.7rem;
    }
  }

  .middle-top-news {
    font-size: 1rem;
    font-family: "Poppins";
  }
`;
export default NewLetterSection;
