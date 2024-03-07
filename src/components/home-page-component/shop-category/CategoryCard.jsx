import React from "react";
import styled from "styled-components";

const CategoryCard = ({ imgSrc, title }) => {
  return (
    <CategoryCardContainer>
      <div className="image-src-container">
        <img src={imgSrc} alt={title} />
      </div>
      <div className="cate-title">
        <h3>{title}</h3>
      </div>
    </CategoryCardContainer>
  );
};

const CategoryCardContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5em;
  .image-src-container {
    width: 10em;
    height: 10em;
    background-color: #ececec;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    img {
      width: 9em;
      height: 9em;
      border-radius: 50%;
      transition: 500ms ease-in;
    }
  }

  &:hover {
    .image-src-container {
      img {
        transform: scale(1.07);
      }
    }
  }
  .cate-title {
    font-family: "Hind";
    font-size: 1rem;
    font-weight: 700;
  }

  
`;

export default CategoryCard;
