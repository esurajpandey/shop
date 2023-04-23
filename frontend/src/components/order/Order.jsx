import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getOrderList } from "../../api/User";
import { Link } from "react-router-dom";
const getFormatedDate = (date) => {
  const d = new Date(date);
  return `${d.getDate()}- ${d.getMonth()}- ${d.getFullYear()}`;
};

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      const data = await getOrderList();
      console.log(data);
      setOrders(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <OrderContainer>
      <div className="order-title">
        <h2>Your orders</h2>
      </div>
      <div className="order-details">
        <table>
          <tr className="order-heading">
            <th>Order Number</th>
            <th>Order Status</th>
            <th>Delivery</th>
            <th>Payment mode</th>
            <th>Total item</th>
            <th>Order on</th>
            <th></th>
          </tr>
          {orders.length > 0 &&
            orders.map((order, index) => {
              return (
                <tr className="order-row" key={order.id}>
                  <td className="order-count">{index + 1}</td>
                  <td className="order-status">{order.orderStatus}</td>
                  <td>{order.deliveryStatus}</td>
                  <td>{order.payment_mode}</td>
                  <td>{order._count.OrderItem}</td>
                  <td>{getFormatedDate(order.orderAt)}</td>
                  <td>
                    <Link to={`/order-details/${order.id}`}>view details</Link>
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    </OrderContainer>
  );
};

const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;

  .order-details {
    margin: 2rem;
    border-radius: 5px;
  }
  table {
    border-collapse: separate;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    background-color: #cce7df;
    border-spacing: 1rem;
    th {
      padding: 8px;
      text-align: left;
      /* background-color: #f2f2f2; */
      font-weight: bold;
    }
    /* 
    tr:nth-child(even) {
      background-color: #f2f2f2;
    } */

    td {
      padding-left: 0.7rem;
    }
  }
`;

export default Order;
