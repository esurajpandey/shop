import React from "react";
import styled from "styled-components";

const OfferCard = ({ imageSrc, title, text, secondText, btnControl }) => {
  return (
    <OfferCardContainer imageSrc={imageSrc}>
      <div className="offer-card-data">
        <div className="offer-card-title">
          <span>{title}</span>
        </div>
        <div className="offer-card-text">
          <h2>{text}</h2>
        </div>
        <div className="card-second-text">
          <span>{secondText}</span>
        </div>

        <div className="btn-control">
          <button>Shop</button>
        </div>
      </div>
      <div className="offer-card-right-side"></div>
    </OfferCardContainer>
  );
};

const OfferCardContainer = styled.div`
  background-image: url(${({ imageSrc }) => (imageSrc ? imageSrc : "")});
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  min-height: 27em;
  width: 45%;
  margin: 3rem;
  display: flex;

  .offer-card-data {
    width: 50%;
    margin-top: 3em;
    margin-left: 4em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    color: white;
    font-family: "Poppins";
  }

  .offer-card-title {
    span {
      font-size: 1.2rem;
      font-weight: 900;
      font-family: inherit;
    }
  }

  .offer-card-text {
    h2 {
      font-size: 3rem;
      font-family: inherit;
      font-weight: 900;
    }
  }

  .card-second-text {
    span {
      letter-spacing: 0.05rem;
    }
  }

  .btn-control {
    button {
      font-family: "Poppins";
      padding: 0.3em 1.5em;
      background-color: white;
      font-size: 1.1rem;
      color: black;
      display: flex;
      align-items: center;
      border-radius: 2.5em;
      transition: 300ms ease-in-out;
      border: 1px solid transparent;
      &:hover {
        border: 1px solid white;
        background-color: transparent;
        color: white;
      }
    }
  }

  .offer-card-right-side {
    width: 50%;
  }

  @media (max-width: 600px){
    min-height: 27em;
    flex-direction: column;
    width: 80%;

    .offer-card-data{
      width: 100%;
      /* margin-top: 3em;
      margin-left: 4em; */

    }
    .offer-card-text{
      width: 90%;
      h2 {
        font-size: 1.7rem;
        font-weight: 700;
        width: 80%;
        word-wrap: break-word;
        
      }

    }
    .card-second-text{
      display: none;
    }
  }
`;

export default OfferCard;
