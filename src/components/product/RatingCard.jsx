import React from "react";
import styled from "styled-components";

const RatingCard = ({ rating }) => {
  return (
    <RatingCardContainer>
      <div className="rate-value">{rating?.rating}</div>
      <div className="review">{rating.comment}</div>
      <div className="added-at">
        {new Date(rating.createdAt).toLocaleDateString()}
      </div>
    </RatingCardContainer>
  );
};

const RatingCardContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  font-family: "Poppins";
  .rate-value {
    padding-inline: 1rem;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    background-color: #1a653a;
    font-weight: 900;
    color: white;
    border-radius: 5px;
  }
`;
export default RatingCard;
