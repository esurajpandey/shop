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
  /* width: 100%; */
  box-sizing: border-box;
  /* border: 1px solid grey; */
  /* height: 100%; */
  min-height: 28em;
  max-width: 98vw;
`;
export default OfferSection;
