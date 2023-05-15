import React, { useEffect, useState } from "react";
import {useToast,Spinner} from '@chakra-ui/react';
import {getWishlist} from '../../api/User';
import styled from "@emotion/styled";
import { Link } from 'react-router-dom';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {MdDelete} from 'react-icons/md';
import { addToCart } from "../../api/Shop";
import { removeFromWishlist } from "../../api/User";

const Wishlist = () => {
  const [wishlist,setWishlist] = useState([]);
  const [loading,setLoading] = useState();
  const toast = useToast({
    duration : 2000,
    isClosable : true,
    position : "top-right" 
  })

  const handleFetchWishList = async () => {
    try{
      setLoading(true);
      const data = await getWishlist();
      setWishlist(data.data);
    }catch(err){
      toast({
        title : err.message,
        status : "error"
      })
    }finally{
      setLoading(false);
    }
  }
  const getDate = (d) => {
    const date = new Date(d);
    date.setHours(0,date.getHours()-1,0,0);
    return date.toDateString();
  }

  useEffect(()=>{
    handleFetchWishList();
  },[])


  const handleAddToCart = async (productId) => {
    try {
      setLoading(true);
      setTimeout(async()=>{
        const data = await addToCart(productId);
        toast({
          title: data.message,
          status: "success",
        });
        await handleRemoveFromWishlist(productId);
      },500);
    } catch (err) {
      toast({
        title: err.message,
        statussuccess: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId) =>{
    try {
      setLoading(true);
      const data = await removeFromWishlist(productId);
      toast({
        title: data.message,
        status: "success",
      });
      await handleFetchWishList();
    } catch (err) {
      toast({
        title: err.message,
        statussuccess: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return <>
    {loading ? 
    <SpinnerContainer>
      <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl'
      fontSize="2rem"
    /> 
    </SpinnerContainer>:
    <WishlistContainer>
      <TableContainer>
        <Table size='md'>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Product details</Th>
              <Th>Added on</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
           {wishlist.length > 0 && wishlist.map(item => {
            return <Tr key={item.product.id}>
                <Td>
                  <div className="wish-img">
                      <img src={item.product?.pictures[0]} alt={item?.product?.name} />
                  </div>
                </Td>
                <Td>
                  <div className="name-brand">
                    <Link to={`/product/${item.product.id}`}><h5>{item?.product?.name}</h5></Link>
                    <h6>Brand :  <span>{item?.product?.brand?.name}</span></h6>
                  </div>
                </Td>
                <Td>{getDate(item.addedAt)}</Td>
                <Td>
                  <AiOutlineShoppingCart className="add-cart-btn"fontSize="2rem" onClick={()=> handleAddToCart(item?.product?.id)}/>
                </Td>
                <Td>
                  <MdDelete fontSize="2rem" className="removefrom-cart-btn"  onClick={()=> handleRemoveFromWishlist(item?.product?.id)}/>
                </Td>
            </Tr>
           })}
          </Tbody>
        </Table>
      </TableContainer>
    </WishlistContainer>}
  </>;
};
const WishlistContainer = styled.div`
  margin-inline: 5em;
  .wish-img{
    display: flex;
    width: 4em;
    height: 4em;
    img{
        width: 4em;
        height: 4em;
      }
  }

  .add-cart-btn{
    color: #09ec95;
    transition: 300ms;
    &:hover{
      transform: scale(1.1);
      color :#2a9a6f;
    }
  }

  .removefrom-cart-btn{
    color: #f27070;
    transition: 300ms;
    &:hover{
      transform: scale(1.2);
    }
  }
`

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #b8babd;
  height: 31em;
`
export default Wishlist;
