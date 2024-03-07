import React from "react";
import styled from "styled-components";
import freePic from "../../assets/svg-export/freePicup.svg";
import freeShipping from "../../assets/svg-export/FreeSepping.svg";
import lowPrice from "../../assets/svg-export/lowPrice.svg";
import available from "../../assets/svg-export/available.svg";

const DescriptionSection = () => {
  return (
    <DescContainer>
      <DescDetailBox>
        <div className="icon">
          <img src={freePic} alt="" />
        </div>
        <div className="desc-text">
          <span>Curb-side pickup</span>
        </div>
      </DescDetailBox>
      <DescDetailBox>
        <div className="icon">
          <img src={freeShipping} alt="" />
        </div>
        <div className="desc-text">
          <span>Free shipping on orders over &#8377;500</span>
        </div>
      </DescDetailBox>
      <DescDetailBox>
        <div className="icon">
          <img src={lowPrice} alt="" />
        </div>
        <div className="desc-text">
          <span>Low prices guaranteed</span>
        </div>
      </DescDetailBox>
      <DescDetailBox>
        <div className="icon">
          <img src={available} alt="" />
        </div>
        <div className="desc-text">
          <span>Available to you 24/7</span>
        </div>
      </DescDetailBox>
    </DescContainer>
  );
};

const DescContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0.8em 3em;
  margin-right: 4.5em;
  
  min-height: 12em;
  /* border: 1px solid black; */
  background-color: white;

  @media (max-width: 600px){
    margin : 0;
    margin: 0em 2.5em;
    margin-bottom: 2em;
    flex-direction: column;
  }
`;

const DescDetailBox = styled.div`
  display: flex;
  align-items: center;
  min-width: 14em;
  max-width: 14em;
  height: 7rem;
  gap: 1rem;
  padding: 0.5rem;
  .icon {
    display: flex;
    img {
      width: 4rem;
      height: 4rem;
    }
  }
  .desc-text {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 700;
  }
`;
export default DescriptionSection;
