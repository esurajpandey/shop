import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CartItem from "../item/CartItem";
import styled from "styled-components";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const fetchCarts = async () => {
    try {
      const { data } = await axios.get("/api/cart/items");
      console.log(data.data[0].product);
      setCartItems(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));

    if (!userDetails) {
      return navigate("/login");
    }
    setToken(userDetails.token);

    fetchCarts();
    console.log(cartItems.length);
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      if (!token) {
        const user = JSON.parse(localStorage.getItem("user"));
        setToken(user.token);
      }
      const { data } = await axios.put(`/api/cart/update-item/${productId}`, {
        quantity: newQuantity,
      });
      await fetchCarts();
      console.log(data), "geo";
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const { data } = await axios.delete(`/api/cart/remove-item/${productId}`);
      alert(data.message);
      await fetchCarts();
    } catch (err) {
      console.log(err.response);
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
            <OrderButton>PLACE ORDER</OrderButton>
          </div>
        </CartTotal>
      </div>
    </CartContainer>
  );
};

const CartItems = styled.div`
  background-color: white;
  width: 70%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  border-radius: 5px;
  box-shadow: 3px 1px 27px -2px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 3px 1px 27px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 3px 1px 27px -2px rgba(0, 0, 0, 0.75);

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const CartTotal = styled.div`
  background-color: white;
  width: 22em;
  height: 20em;
  display: flex;
  flex-direction: column;
  padding: 1em;
  gap: 0.7em;
  box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
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
`;

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1em 4em;

  .heading {
    font-family: "Roboto Mono";
    font-weight: 700;
    text-decoration: underline;
  }
  .main-cart-container {
    display: flex;
    flex-direction: row;
    gap: 3em;
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
