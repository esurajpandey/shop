import React, { useEffect, useState } from "react";
import Images from "../image/Images";
import styled from "styled-components";
import ProductSideContainer from "./ProductSideContainer";
import { useNavigate, useParams } from "react-router-dom";
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
import ImageSlider from "../image/ImageSlider";

const baseUrl = import.meta.env.VITE_defaultURL;
const paymentKey = import.meta.env.VITE_payment_key;
const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [paymentMode, setPaymentMode] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [disbaledBtn, setDisbaledBtn] = useState(false);
  const [orderBtn, setOrderBtn] = useState(false);
  const toast = useToast({
    duration: 2000,
    isClosable: true,
    position: "top-right",
  });

  const navigate = useNavigate();

  const Razorpay = useRazorpay();

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/product/${productId}`);
      const data = await response.json();
      setProduct(data.data);

    } catch (err) {
      toast({
        title: err.message,
        status: "error",
      });
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
      setOrderBtn(true);
      if (!paymentMode) {
        toast({
          title: "Please select payment mode",
          status: "warning",
        });
        return;
      }

      const orderData = {
        productId,
        paymentMode,
      };

      const data = await orderNow(orderData);

      if (paymentMode === "ONLINE") {
        const user = getUser();
        const options = getPaymentOption(data.data, user);
        const razor = new window.Razorpay(options);
        onClose();
        razor.open();
      } else {
        toast({
          title: data.message,
          status: "success",
        });
        onClose();
        setTimeout(() => {
          navigate("/orders");
        }, 500);
      }
    } catch (err) {
      toast({
        title: err.message,
        statussuccess: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setOrderBtn(false);
      }, 2000);
    }
  };

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      setDisbaledBtn(true);
      const data = await addToCart(productId);
      toast({
        title: data.message,
        status: "success",
      });
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setDisbaledBtn(false);
      }, 2000);
    }
  };

  return (
    <ProductContainer>
      {loading && <ShowLoading />}
      {!loading && product && (
        <div className="main-container-product">
          <ProductImagesBuy>
            {/* <Images pictures={product.pictures} /> */}
            <ImageSlider images={product?.pictures}/>
            <Buybuttons>
              <button onClick={handleAddToCart} disabled={disbaledBtn}>
                <AiOutlineShoppingCart />
                <span>Add to cart </span>
              </button>
              <button onClick={onOpen} disabled={orderBtn}>
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media screen and (max-width: 600px) {
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
  @media (max-width: 600px) {
    position: relative;
    border: 1px solid red;
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

    :disabled {
      background-color: #655e5e;
      &:hover {
        background-color: #655e5e;
      }
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
