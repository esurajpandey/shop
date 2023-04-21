import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Images from "../../image/Images";

const CartItem = ({ product, quantityInCart, onQuantityChange, onRemove }) => {
  const [quantity, setQuantity] = useState(quantityInCart);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    onQuantityChange(product.id, newQuantity);
  };

  const handleRemoveClick = () => {
    onRemove(product.id);
  };

  return (
    <CartItemsConatiner>
      <ImageContainer>
        <img src={product.pictures[0]} />
      </ImageContainer>
      <ProductdetailsContainer>
        <div className="product-name">
          <h3>{product.name}</h3>
        </div>
        <div className="product-details-container">
          <span>Price: &#x20B9;{product.unitPrice.toFixed(2)}</span>

          <QuantityDropdown>
            <label htmlFor="quantity">Quantity:</label>
            <select
              name="quantity"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
            >
              {[...Array(10)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </QuantityDropdown>

          <span className="color">
            Color :
            <div
              style={{
                backgroundColor: `${product.color.name}`,
                width: "1em",
                height: "1em",
              }}
            ></div>
          </span>

          <span className="weight">Weight : {product.weight}</span>
          <span className="stock">
            Item left in stock : {product.quantityInStock}
          </span>
        </div>
        <div className="brand-name">Brand : {product.brand.name}</div>
        <button className="remove-button" onClick={handleRemoveClick}>
          Remove
        </button>
      </ProductdetailsContainer>
    </CartItemsConatiner>
  );
};

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 8em;
    height: 8em;
  }

  @media (max-width: 500px) {
    justify-content: flex-start;
    align-items: flex-start;

    img {
      width: 5em;
      height: 5em;
    }
  }
`;

const ProductdetailsContainer = styled.div`
  /* border: 1px solid green; */
  width: 100%;
  display: flex;
  flex-direction: column;

  .product-name {
    h3 {
      margin: 0;
      padding: 0;
    }
  }
  .color {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  .product-details-container {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 700px) {
      /* flex-direction: column; */
      align-items: flex-start;
      gap: 0.2em;
      flex-wrap: wrap;
    }
  }

  .remove-button {
    background-color: #ec4646;
    color: white;
    padding: 0.5em 0.8em;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 10em;
    :hover {
      background-color: #d32f2f;
    }
  }
`;

const QuantityDropdown = styled.div`
  /* margin-bottom: 10px; */
`;

const CartItemsConatiner = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 9fr;
  /* border-bottom: 1px solid grey; */
  padding: 0.8em 0.4em;
  transition-duration: 250ms;

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }

  &:hover {
    box-shadow: 3px 3px 8px 0px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 3px 3px 8px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 3px 3px 8px 0px rgba(0, 0, 0, 0.75);
  }
`;

export default CartItem;
