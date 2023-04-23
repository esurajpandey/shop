import React from "react";
import styled from "styled-components";

const BestPrice = () => {
  return (
    <BestPriceContainer>
      <div className="left-side-box">
        <img
          src="https://res.cloudinary.com/durmhsdmz/image/upload/v1682257363/c837a6_42dd66a436e846648736f4bc9546bf14mv2_jtkcbc.png"
          alt="Best Price"
        />
      </div>
      <div className="right-side-box">
        <div className="details-for-best-price">
          <div className="tot-text">Save up to</div>
          <div className="amount-text">&#8377; 150</div>
          <div className="tot-down-text">
            on selected laptop & tablets brands
          </div>
          <div className="best-price-terms">Terms and conditions apply</div>
          <div className="btn-box-best-price">
            <button>Shop</button>
          </div>
        </div>
      </div>
    </BestPriceContainer>
  );
};

const BestPriceContainer = styled.div`
  margin: 0.8em 3em;
  margin-right: 4.5em;
  display: flex;
  background-color: white;
  .left-side-box {
    img {
      width: 40em;
      height: 30em;
    }
  }

  .right-side-box {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    align-items: center;
    justify-content: center;
    margin-left: 3em;
  }

  .details-for-best-price {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-family: "Hind";
  }

  .tot-text,
  .tot-down-text {
    font-weight: 600;
    font-size: 1.5rem;
  }

  .amount-text {
    font-size: 6rem;
    font-weight: 700;
  }

  .best-price-terms {
    font-size: 1rem;
    font-family: "Poppins";
  }

  .btn-box-best-price {
    margin-top: 1rem;
    button {
      font-family: "Poppins";
      padding: 0.3em 2em;
      background-color: #751fff;
      font-size: 1.2rem;
      color: white;
      display: flex;
      align-items: center;
      border-radius: 2.5em;
      transition: 300ms ease-in-out;
      outline: 1px solid transparent;
      &:hover {
        outline: 1px solid transparent;
        background-color: transparent;
        color: black;
      }
    }
  }
`;

export default BestPrice;
