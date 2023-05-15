import React, { useEffect, useState } from "react";
import {Link, useParams} from 'react-router-dom';
import styled from "styled-components";
import { Skeleton, Stack, useToast } from "@chakra-ui/react";
import { getProducts } from "../api/Shop";
import {ProductLists} from './Category/CategoryPage';
import ProductCardContainer from "../components/product/ProductCartContainer";
const Search = () => {
  const {searchParams} = useParams();
  const [products,setProduct] = useState([]);
  const [loading,setLoading] = useState(false);
  const toast = useToast({
    duration : 4000,
    isClosable : true,
    position : "top-right",
    variant: "top-accent"
  })

  const handleSearchProducts = async (searchQuery) =>{
    try{
      setLoading(true);
      const data = await getProducts(`name=${searchQuery}`);
      console.log(data);
      setProduct(data?.data?.products);
    }catch(err){
      toast({
        title : err.message,
        status : "info"
      })
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{ 
    handleSearchProducts(searchParams);
  },[searchParams])
  return <SearchContainer>
    {
      loading && 
      <Stack className="stack">
        <Skeleton height="5em" />
        <Skeleton height="5em" />
        <Skeleton height="5em" />
        <Skeleton height="5em" />
        <Skeleton height="5em" />
      </Stack>
    }

    <ProductLists>
     {products.length > 0 &&
        products.map((product) => {
          return (
            <Link to={`/product/${product.id}`} key={product.id}>
              <ProductCardContainer product={product} key={product.id} />
            </Link>
          );
      })}
    </ProductLists>
  </SearchContainer>;
};


const SearchContainer = styled.div`
  margin-inline: 2em;
  margin-top: 2em;
`
export default Search;
