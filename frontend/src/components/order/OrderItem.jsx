import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReviewModal from "./ReviewModal";

const OrderItem = ({ order }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <OrderItemContainer>
      <Picsection>
        <img src={order.product?.pictures[0]} alt={order?.product?.name} />
      </Picsection>
      <OrderData>
        <div className="name-section">
          <Link to={`/product/${order.product.id}`}>
            <h3>{order.product.name}</h3>
          </Link>
        </div>
        <div className="order-desc">
          <div className="brand-section">
            <span className="data-title">Brand</span> :{" "}
            {order.product.brand?.name}
          </div>
          <div className="quantity">
            <span className="data-title">Total quantity</span> :{" "}
            {order.quantity}
          </div>
          <div className="price-section">
            <span className="data-title">Price</span> : &#8377;{order.unitPrice}
          </div>
          <div className="order-time">
            <span className="data-title">Order date</span> :{" "}
            {order.order.orderAt}
          </div>
        </div>
      </OrderData>
      <div className="review-btns">
        <button onClick={onOpen}>Review</button>
      </div>
      <ReviewModal
        isOpen={isOpen}
        onClose={onClose}
        orderId={order.order.id}
        review={order.review}
        productId={order.product.id}
      />
    </OrderItemContainer>
  );
};

const OrderItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2em;
  min-width: 70vw;
  position: relative;
  padding: 0.5em;
  border-bottom: 1px solid black;
  transition: 250ms ease-in;
  &:hover {
    box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.75);
  }
  .review-btns {
    position: absolute;
    right: 7em;
    button {
      padding: 0.4em 1.5em;
      border-radius: 8px;
      background-color: #408e91;
      color: white;
      border: 0;
    }
  }
`;

const OrderData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 70vw;
  .data-title {
    color: #19376d;
  }
  .order-desc {
    display: flex;
    gap: 1em;
    min-width: 70vw;
  }
`;

const Picsection = styled.section`
  img {
    width: 5em;
    height: 5em;
    min-height: 5em;
    max-height: 6em;
    max-width: 6em;
    min-width: 5em;
    border-radius: 4px;
  }
`;
export default OrderItem;
