import React, { useEffect, useState } from "react";
import Images from "../image/Images";
import styled from "styled-components";
import ProductSideContainer from "./ProductSideContainer";
import { useParams } from "react-router-dom";
import axios from "axios";
const Product = () => {
  //   const { productId } = useParams();
  const [product, setProduct] = useState();

  const productId = "55276ed6-8847-443b-a8ae-0ffe843e4316";
  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/api/product/${productId}`);
      console.log(data);
      setProduct(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // fetchProduct();
  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return (
    <ProductContainer>
      <div className="main-container-product">
        <ProductImages>
          <Images />
        </ProductImages>
        {product && <ProductSideContainer product={product} />}
      </div>
    </ProductContainer>
  );
};

const ProductImages = styled.div`
  min-width: 500px;
  @media (max-width: 600px) {
    min-width: 400px;
  }
`;

const ProductContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.5em;
  position: fixed;
  padding-bottom: 10em;

  .main-container-product {
    display: flex;
    border: 1px solid blue;
    width: 100%;
    height: 100%;

    @media (max-width: 600px) {
      flex-direction: column;
    }
  }
  @media (max-width: 600px) {
    position: relative;
  }
`;

export default Product;
