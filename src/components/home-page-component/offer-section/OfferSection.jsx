import React from "react";
import styled from "styled-components";
import OfferCard from "./OfferCard";

const OfferSection = () => {
  return (
    <OfferSectionContainer>
      <OfferCard
        imageSrc={
          "https://res.cloudinary.com/durmhsdmz/image/upload/v1682243378/iphone_nwhmua.webp"
        }
        title="Holidays Deals"
        text="Up to 30% off"
        secondText="Selected Smartphone Brands"
      />
      <OfferCard
        imageSrc={
          "https://res.cloudinary.com/durmhsdmz/image/upload/v1682243425/boat_ankfiq.webp"
        }
        title="Just In"
        text="Take Your Sound Anywhere"
        secondText="Top Headphone Brands"
      />
    </OfferSectionContainer>
  );
};

const OfferSectionContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  min-height: 28em;
  width: 100%;
  @media only screen and (max-width: 480px){
    max-width: 412px !important;
    min-height: 15em;
    flex-direction: column;
    align-items: center;
  }
`;
export default OfferSection;
