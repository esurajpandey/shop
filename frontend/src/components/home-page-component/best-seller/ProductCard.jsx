import React from "react";
import styled from "styled-components";

const processDesc = (product) => {
  return "This is my product";
};
const ProductCard = ({ product }) => {
  //   console.log(product);
  return (
    <>
      {product && (
        <ProductCardContaier>
          <div className="card-tag">
            <span>SALE</span>
          </div>
          <div className="image-section">
            <img
              src={
                product.pictures &&
                product.pictures.length > 0 &&
                product?.pictures[0]
              }
              alt={product?.name}
            />
          </div>
          <div className="card-details-section">
            <span className="p-name">{product.name}</span>
            <span className="bnd">{product.brand.name}</span>
            <span>&#8377;{product.unitPrice}</span>
          </div>
        </ProductCardContaier>
      )}
    </>
  );
};

const ProductCardContaier = styled.div`
  max-width: 13rem;
  min-height: 20rem;
  max-height: 21rem;
  min-width: 13rem;
  outline: 1px solid gray;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: hidden;
  border-radius: 3px;
  cursor: pointer;
  .card-tag {
    span {
      background-color: red;
      color: white;
      font-size: 0.9rem;
      padding: 0.3em 0.6em;
      border-radius: 3px;
    }
  }
  .image-section {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.5s;

    img {
      display: block;
      width: 11em;
      height: 11em;
      border-radius: 2px;
      transition: transform 0.5s;
    }
  }

  .card-details-section {
    display: flex;
    flex-direction: column;
    /* border: 1px solid red; */
    min-height: 4em;
    max-height: 5em;
    gap: 0.2em;
    .p-name {
      min-height: 1.5em;
      color: #2c3333;
    }
    .bnd {
      overflow-y: hidden;
      color: #0e8388;
    }
  }

  &:hover {
    .image-section {
      transform: scale(1.05);
    }
  }
`;
export default ProductCard;
