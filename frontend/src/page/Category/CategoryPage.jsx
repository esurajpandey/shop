import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { getProducts } from "../../api/Shop";
import ProductCard from "../../components/home-page-component/best-seller/ProductCard";
import { Box, Spinner } from "@chakra-ui/react";

const CategoryPage = () => {
  const { query } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleFetchProducts = async () => {
    try {
      if (query === "all") {
      }
      const queryString = `category=${query}`;
      console.log(queryString);
      const data = await getProducts(queryString);
      setProducts(data.data);
    } catch (err) {
      console.log("In category page", { message: err.message });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(query);
    handleFetchProducts();
  }, [query]);

  return (
    <CategoryPageContainer>
      {loading ? (
        <div className="loader">
          <Spinner size="xl" color="blue.500" />
        </div>
      ) : (
        <>
          <Filters></Filters>
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
        </>
      )}
    </CategoryPageContainer>
  );
};

const CategoryPageContainer = styled.div`
  display: flex;
  flex-direction: column;

  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10em;
  }
`;

const Filters = styled.div``;

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

export default CategoryPage;
