import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { getProducts } from "../../api/Shop";
import { Box, Spinner, useToast } from "@chakra-ui/react";
import ProductCardContainer from "../../components/product/ProductCartContainer";
import { getCategories } from "../../api/Admin";
import { Select } from "@chakra-ui/react";
import { getBrands } from "../../api/Admin";
const CategoryPage = () => {
  const { query } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [queries, setQueries] = useState({
    lessThan: "",
    moreThan: "",
    brand: "",
    category: "",
  });

  const toast = useToast({
    duration: 2000,
    position: "top-right",
    isClosable: true,
    variant: "subtle",
  });

  const fetchCategoryAndBrand = async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      const brands = await getBrands();
      setBrands(brands.data);
      setCategories(data.data);
    } catch (err) {
      toast({
        title: err.message || "No category found",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFetchProducts = async (query) => {
    try {
      const data = await getProducts(query);
      setProducts(data.data.products);
    } catch (err) {
      toast({
        title: err.message || "No product found",
        status: "info",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryAndBrand();
  }, []);

  useEffect(() => {
    handleFetchProducts(`category=${query}`);
  }, [query]);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (queries.brand) {
      queryParams.append("brand", queries.brand);
    }

    if (queries.category) {
      queryParams.append("category", queries.category);
    }

    if (queries.lessThan) {
      queryParams.append("lessThan", queries.lessThan);
    }
    if (queries.moreThan) {
      queryParams.append("moreThan", queries.moreThan);
    }
    handleFetchProducts(queryParams.toString());
  }, [queries]);
  return (
    <CategoryPageContainer>
      {loading ? (
        <div className="loader">
          <Spinner size="xl" color="blue.500" />
        </div>
      ) : (
        <>
          <Filters>
            <Select
              placeholder="Brands"
              size="sm"
              onChange={(e) =>
                setQueries((prev) => ({ ...prev, brand: e.target.value }))
              }
            >
              {brands && brands.map((item) => {
                  return (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
            </Select>
            <Select
              placeholder="Categories"
              size="sm"
              onChange={(e) =>
                setQueries((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              {categories && categories.map((item) => {
                  return (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  );
                })}
            </Select>
            <Select
              placeholder="Price less than"
              size="sm"
              onChange={(e) =>
                setQueries((prev) => ({ ...prev, lessThan: e.target.value }))
              }
            >
              <option value={500}>&#8377; 500</option>
              <option value={1000}>&#8377; 1000</option>
              <option value={5000}>&#8377; 5000</option>
              <option value={10000}>&#8377; 10000</option>
            </Select>
            <Select
              placeholder="Price more than"
              size="sm"
              onChange={(e) =>
                setQueries((prev) => ({ ...prev, moreThan: e.target.value }))
              }
            >
              <option value={500}>&#8377; 500</option>
              <option value={1000}>&#8377; 1000</option>
              <option value={5000}>&#8377; 5000</option>
              <option value={10000}>&#8377; 10000</option>
            </Select>
          </Filters>
          <ProductLists>
            {products && products.map((product) => {
                return (
                  <Link to={`/product/${product.id}`} key={product.id}>
                    <ProductCardContainer product={product} key={product.id} />
                  </Link>
                );
              })}
          </ProductLists>
        </>
      )}
    </CategoryPageContainer>
  );
};


const Filters = styled.div`
  position: sticky;
  top: 9em;
  display: flex;
  backdrop-filter: blur(15px);
  background-color: #eef1f4;
  padding: 0.4em;
  padding-left: 1em;
  padding-right: 2em;
  z-index: 10;
  gap: 2em;
  select {
    border: 1px solid black;
    border-radius: 5px;
    &:focus,
    &:hover {
      border: 1px solid black;
      outline: 0;
    }
  }
  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    gap: 1em;
    top: 14.6em;
    padding: 2em 1em;

  }
  @media screen and (max-width: 1000px) {
    top: 14.6em;
  }
`;

export const ProductLists = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: black;
  align-items: center;
  
  padding: 2rem;
  gap: 3em;
  /* border: 1px solid red; */

  @media screen and (max-width: 600px){
    width: 100%;
    justify-content: center;
  }
`;

const CategoryPageContainer = styled.div`
  display: flex;
  flex-direction: column;
 
  position: relative;
  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10em;
  }

  @media (max-width: 600px){
   
  }
  
`;
export default CategoryPage;
