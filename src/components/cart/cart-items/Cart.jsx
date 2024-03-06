import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../item/CartItem";
import styled from "styled-components";
import useRazorpay from "react-razorpay";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Select,
  useToast,
} from "@chakra-ui/react";
import getPaymentOption from "../../../utils/getPaymentOption";
const paymentKey = import.meta.env.VITE_payment_key;

import {
  getCartItems,
  removeItemFromCart,
  updateCartItem,
} from "../../../api/User";
import { placeOrder } from "../../../api/Shop";
import { getUser } from "../../../api/commonCall";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMode, setPaymentMode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast({
    duration: 2000,
    isClosable: true,
    position: "top-right",
  });

  const fetchCarts = async () => {
    try {
      const res = await getCartItems();
      setCartItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    if (!userDetails) {
      return navigate("/login");
    }
    fetchCarts();
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const data = await updateCartItem(productId, newQuantity);
      await fetchCarts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const data = await removeItemFromCart(productId);
      await fetchCarts();
      toast({
        title: "Item is removed",
        status: "success",
      });
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
      });
    }
  };

  const cartTotalCount = cartItems?.reduce(
    (total, item) => +total + +item.quantity,
    0
  );

  const getTotalPrice = (carts) => {
    const total = carts?.reduce(
      (total, item) => +total + +item.quantity * +item.unitPrice,
      0
    );
    return total;
  };

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

      const data = await placeOrder({ paymentMode });

      if (paymentMode === "ONLINE") {
        const user = getUser();
        const options = getPaymentOption(data.data, user);
        const razor = new window.Razorpay(options);
        razor.open();
        onClose();
        return;
      } else {
        toast({
          title: "Order is confirmed",
          status: "success",
        });
        onClose();
        return navigate("/orders");
      }
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContainer>
      <h1 className="heading">Shopping Cart</h1>
      <div className="main-cart-container">
        {cartItems.length > 0 && (
          <CartItems>
            {cartItems.map((item) => {
              return (
                <CartItem
                  product={item.product}
                  key={item.product.id}
                  quantityInCart={item.quantity}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                />
              );
            })}
          </CartItems>
        )}

        {cartItems.length > 0 && (
          <CartTotal>
            <h3 className="price-heading">PRICE DETAILS</h3>

            <div className="cart-total-rows">
              <span className="row-value">Price ({cartTotalCount} items)</span>{" "}
              <span className="value"> &#8377; {getTotalPrice(cartItems)}</span>
            </div>
            <div className="cart-total-rows">
              <span className="row-value">Delivery Charges</span>{" "}
              <span className="value">
                {" "}
                &#8377; {getTotalPrice(cartItems) > 1500 ? "Free" : "100"}
              </span>
            </div>

            <div className="cart-total-rows">
              <span className="row-value">Total Amount</span>{" "}
              <span className="value">
                {" "}
                &#8377;{" "}
                {getTotalPrice(cartItems) > 1500
                  ? getTotalPrice(cartItems)
                  : getTotalPrice(cartItems) + 100}
              </span>
            </div>

            <div className="place-order-btn">
              <OrderButton onClick={onOpen}>PLACE ORDER</OrderButton>
            </div>
          </CartTotal>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
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
    </CartContainer>
  );
};

const CartItems = styled.div`
  background-color: white;
  width: 70%;
  height: 100%;
  /* padding: 1rem; */
  display: flex;
  flex-direction: column;
  gap: 1em;
  border-radius: 5px;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const CartTotal = styled.div`
  background-color: white;
  display: flex;
  width: 30%;
  height: fit-content;
  flex-direction: column;
  padding: 1em 2.5em;
  gap: 0.7em;

  .price-heading {
    font-family: "Roboto Mono";
    font-size: 1.5rem;
    font-weight: 500;
    border-bottom: 1px solid grey;
    margin-bottom: 1em;
  }

  .cart-total-rows {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .place-order-btn {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-top: 5em;
  }

  @media (max-width: 700px) {
    display: none;
  }

  &:hover {
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.75);
    border-radius: 5px;
  }
`;

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1em 4em;
  box-sizing: border-box;
  background-color: #dadada;
  min-height: 77vh;
  .heading {
    font-family: "Roboto Mono";
    font-weight: 700;
    font-size: 2rem;
  }
  .main-cart-container {
    display: flex;
    flex-direction: row;
    gap: 3em;
    /* height: 100vh;
    width: 100%; */
  }
`;

const OrderButton = styled.button`
  border: 0;
  padding: 0.5em 0.8em;
  background-color: #f36405;
  width: 100%;
  font-family: "Noto Serif";
  font-weight: 600;
  color: white;

  :hover {
    background-color: #a54302;
  }
`;
export default Cart;
