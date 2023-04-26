import React, { useEffect, useState } from "react";
import Images from "../image/Images";
import styled from "styled-components";
import ProductSideContainer from "./ProductSideContainer";
import { useParams } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TiFlash } from "react-icons/ti";
import { addToCart, orderNow } from "../../api/Shop";
import { getUser } from "../../api/commonCall";
import useRazorpay from "react-razorpay";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  useDisclosure,
  Button,
  Select,
} from "@chakra-ui/react";
import getPaymentOption from "../../utils/getPaymentOption";

const baseUrl = import.meta.env.VITE_defaultURL;
const paymentKey = import.meta.env.VITE_payment_key;
const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [paymentMode, setPaymentMode] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const Razorpay = useRazorpay();
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/product/${productId}`);
      const data = await response.json();
      setProduct(data.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const handleOrderNow = async () => {
    try {
      setLoading(true);

      if (!paymentMode) {
        toast({
          title: "Please select payment mode",
          position: "bottom",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      const orderData = {
        productId,
        paymentMode,
      };

      console.log(orderData);

      const data = await orderNow(orderData);

      console.log(data.data);
      const user = getUser();
      const options = getPaymentOption(data.data, user);
      console.log(options);
      const razor = new window.Razorpay(options);

      onClose();
      razor.open();
    } catch (err) {
      toast({
        title: err.message,
        position: "bottom",
        statussuccess: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      const data = await addToCart(productId);
      toast({
        title: data.message,
        position: "top-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: err.message,
        position: "bottom",
        statussuccess: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContainer>
      {loading && <ShowLoading />}
      {!loading && product && (
        <div className="main-container-product">
          <ProductImagesBuy>
            <Images pictures={product.pictures} />
            <Buybuttons>
              <button onClick={handleAddToCart}>
                <AiOutlineShoppingCart />
                <span>Add to cart </span>
              </button>
              <button onClick={onOpen}>
                <TiFlash />
                <span>Order Now</span>
              </button>
            </Buybuttons>
          </ProductImagesBuy>
          {product && <ProductSideContainer product={product} />}
        </div>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Payment mode</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              placeholder="Select any payment mode"
              variant="filled"
              size="md"
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option value="ONLINE">Online</option>
              <option value="COD">Cash on delivery</option>
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleOrderNow}>
              Order now
            </Button>
            <Button variant="ghost">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ProductContainer>
  );
};

const ShowLoading = styled.div``;
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
