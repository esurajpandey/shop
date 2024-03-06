import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getOrderList } from "../../api/User";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { CiMenuKebab } from "react-icons/ci";
import { cancelOrder } from "../../api/Shop";

export const getFormatedDate = (date) => {
  const d = new Date(date);
  return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
};
const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const fetchOrders = async () => {
    try {
      const data = await getOrderList();
      setOrders(data.data);
      showToast(data.message, "success");
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      setLoading(true);
      const data = await cancelOrder(orderId);
      toast({
        title: data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      await fetchOrders();
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
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
          <thead>
            <tr className="order-heading">
              <th>Order Number</th>
              <th>Order Status</th>
              <th>Delivery</th>
              <th>Payment mode</th>
              <th>Total item</th>
              <th>Order on</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
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
                      <Menu>
                        <MenuButton>
                          <CiMenuKebab />
                        </MenuButton>
                        <MenuList maxWidth={"50px"} maxW={"50px"} w={"2rem"}>
                          <MenuItem>
                            <Link to={`/order/${order.id}`}>view details</Link>
                          </MenuItem>
                          {(order.orderStatus === "INITIATED" ||
                            order.orderStatus === "CONFIRMED") &&
                            (order.deliveryStatus === "ORDERED" ||
                              order.deliveryStatus === "PACKED" ||
                              order.deliveryStatus === "SHIPPED") && (
                              <MenuItem
                                onClick={() => handleCancelOrder(order.id)}
                              >
                                Cancel order
                              </MenuItem>
                            )}

                          {order.orderStatus === "CONFIRMED" &&
                            order.deliveryStatus === "DELIVERED" && (
                              <MenuItem
                              // onClick={() => handleCancelOrder(order.id)}
                              >
                                Return order
                              </MenuItem>
                            )}
                        </MenuList>
                      </Menu>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </OrderContainer>
  );
};

const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #cce7df;
  min-height: 30.5em;
  .order-details {
    margin: 0 2em;
    border-radius: 5px;
    min-height: 25em;
    background-color: white;
  }
  .order-title {
    margin-left: 2em;
    margin-top: 1em;
    font-family: "Hind";
  }
  table {
    border-collapse: separate;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;

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
