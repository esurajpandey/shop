import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getOrderItems } from "../../api/User";
const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const data = await getOrderItems(orderId);
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
  return <OrderCardItemContainer></OrderCardItemContainer>;
};

const OrderCardItemContainer = styled.div``;
export default OrderCard;
