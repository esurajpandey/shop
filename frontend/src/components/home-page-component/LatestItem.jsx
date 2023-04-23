import React from "react";
import styled from "styled-components";

const LatestItem = () => {
  return (
    <LatestItemContainer>
      <div className="latest-item-details">
        <div className="tag">
          <span>Best Prices</span>
        </div>
        <div className="text">
          <h2>Incredible Prices on All Your Favorite Item</h2>
          <span>Get more for less on selected brands</span>
        </div>
        <div className="button-container">
          <ButtonDeisgn>Shop Now</ButtonDeisgn>
        </div>
      </div>
    </LatestItemContainer>
  );
};

const LatestItemContainer = styled.div`
  display: flex;
  /* width: 100%; */
  height: 100%;
  /* border: 1px solid blue; */
  min-height: 30em;
  background-image: url("https://res.cloudinary.com/durmhsdmz/image/upload/v1682237713/miz_qeub6k.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  justify-content: flex-start;

  .latest-item-details {
    display: flex;
    flex-direction: column;
    margin-top: 4em;
    margin-left: 12em;
    gap: 0.8em;
  }

  .tag {
    display: flex;

    span {
      background-color: #d72d2d;
      padding: 0.2em 0.6em;
      display: flex;
      align-items: center;
      color: white;
      font-size: 1rem;
      font-family: "Poppins";
      border-radius: 3px;
    }
  }
  .text {
    display: flex;
    flex-direction: column;
    font-family: serif;
    h2 {
      font-size: 3.5rem;
      font-weight: 700;
      max-width: 8em;
      line-height: 1.1em;
    }
    span {
      font-size: 1.2rem;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 300;
      color: black;
      font-family: "Poppins";
    }
  }
`;

const ButtonDeisgn = styled.button`
  font-family: "Poppins";
  padding: 0.4em 2em;
  background-color: #751fff;
  font-size: 1.2rem;
  color: white;
  display: flex;
  align-items: center;
  border-radius: 2em;
  transition: 300ms ease-in-out;
  border: 0;
  &:hover {
    background-color: #1a1717;
  }
`;

export default LatestItem;
