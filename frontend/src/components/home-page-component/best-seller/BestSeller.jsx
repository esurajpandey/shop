import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getProducts } from "../../../api/Shop";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { Box, Spinner } from "@chakra-ui/react";

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const query = "page=1";
      const data = await getProducts(query);
      setProducts(data.data.products);
      console.log(data.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <BestSellerContainer>
      <div className="best-seller-title">Best Sellers</div>
      {loading ? (
        <Spinner size="xl" color="blue.500" />
      ) : (
        <ProductLists>
          {products.length > 0 &&
            products.map((product) => {
              return (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <ProductCard product={product} key={product.id} />
                </Link>
              );
            })}
        </ProductLists>
      )}
      {/* {products.length > 0 && products.map((i) => <span>{i.name}</span>)} */}
    </BestSellerContainer>
  );
};

const BestSellerContainer = styled.div`
  display: flex;
  min-height: 30em;
  flex-direction: column;
  align-items: center;
  margin: 0.8em 3em;
  margin-right: 4.5em;
  padding: 1rem;
  background-color: white;

  .best-seller-title {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const ProductLists = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: black;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1em;
  /* border: 1px solid red; */
`;

export default BestSeller;
