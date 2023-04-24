import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getOrderItems } from "../../api/User";
import OrderItem from "./OrderItem";
const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const data = await getOrderItems(orderId);
      console.log(data);
      setOrderDetails(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);
  return (
    <OrderCardItemContainer>
      <div className="details-section">
        {orderDetails.length > 0 &&
          orderDetails.map((order) => {
            return <OrderItem key={order.product.id} order={order} />;
          })}
      </div>
    </OrderCardItemContainer>
  );
};

const OrderCardItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 30em;
  background-color: #daf5ff;
  .details-section {
    margin: 2em 3em;
    background-color: white;
    border-radius: 5px;
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1em;
  }
`;
export default OrderDetails;
