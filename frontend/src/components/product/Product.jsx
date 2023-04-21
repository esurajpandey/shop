import React, { useEffect, useState } from "react";
import Images from "../image/Images";
import styled from "styled-components";
import ProductSideContainer from "./ProductSideContainer";
import { useParams } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TiFlash } from "react-icons/ti";

const baseUrl = import.meta.env.VITE_defaultURL;
const Product = () => {
  //   const { productId } = useParams();
  const [product, setProduct] = useState();

  const fetchProduct = async () => {
    const productId = "55276ed6-8847-443b-a8ae-0ffe843e4316";
    try {
      const response = await fetch(`${baseUrl}/product/${productId}`);
      const data = await response.json();
      console.log(data);
      setProduct(data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <ProductContainer>
      <div className="main-container-product">
        <ProductImagesBuy>
          <Images />
          <Buybuttons>
            <button>
              <AiOutlineShoppingCart />
              <span>Add to cart </span>
            </button>
            <button>
              <TiFlash />
              <span>Order Now</span>
            </button>
          </Buybuttons>
        </ProductImagesBuy>
        {product && <ProductSideContainer product={product} />}
      </div>
    </ProductContainer>
  );
};

const ProductImagesBuy = styled.div`
  min-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 600px) {
    min-width: 400px;
  }
`;

const ProductContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1em 0;
  padding-left: 1em;
  position: fixed;
  padding-bottom: 10em;
  min-height: 77vh;
  background-color: #f8fcff;
  .main-container-product {
    display: flex;
    /* border: 1px solid blue; */
    width: 100%;
    height: 100%;

    @media (max-width: 700px) {
      flex-direction: column;
      gap: 1rem;
      padding-left: 0.5rem;
    }
  }
  @media (max-width: 700px) {
    position: relative;
  }
`;

const Buybuttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-family: "Noto Serif";

  button {
    padding: 0.5em 1.5em;
    border-radius: 4px;
    font-weight: 600;
    color: white;
    font-size: 1.2em;
    border: 0;

    background-color: #f87a05;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    &:hover {
      background-color: #e67207;
      border: 0;
    }
    svg {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 600px) {
    button {
      padding: 0.3em 1em;
      font-size: 1rem;
      svg {
        font-size: 1.1rem;
      }
    }
  }
`;

export default Product;
