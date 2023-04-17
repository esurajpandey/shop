import React from "react";
import styled from "styled-components";

const ProductSideContainer = ({ product }) => {
  const processProductHeader = (product) => {
    let category = product?.category?.reduce(
      (total, item) => total + " | " + item.name,
      ""
    );
    category = category + " | " + product.weight;
    return category;
  };

  const getOverAllRating = (ratings) => {
    const rate = {
      ONE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5,
      ZERO: 0,
    };

    let total = ratings.reduce((acc, curr) => acc + rate[curr.rating], 0);
  };
  return (
    <>
      {product && (
        <ProductDetails>
          <ProductName>
            <b>{product.name}</b>
            {processProductHeader(product)}
          </ProductName>

          <OverallRating>{getOverAllRating(product.rating)}</OverallRating>
          <PriceDetails></PriceDetails>

          <Offers></Offers>

          <Highlights></Highlights>

          <Details></Details>
          <Description></Description>

          <Categories></Categories>
          <Ratings></Ratings>
        </ProductDetails>
      )}
    </>
  );
};

const ProductDetails = styled.div`
  border: 1px solid red;
  width: 100%;
  overflow: auto;
`;

const ProductName = styled.div``;
const OverallRating = styled.div``;

const Details = styled.div``;

const PriceDetails = styled.div``;

const Offers = styled.div``;

const Highlights = styled.div``;

const Description = styled.div``;

const Categories = styled.div``;

const Ratings = styled.div``;

export default ProductSideContainer;
