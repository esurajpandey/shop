import React from "react";
import styled from "styled-components";
import { Select } from "@chakra-ui/react";
const ViewOrders = () => {
  return (
    <AdminOrderContainers>
      <div className="admin-order-content">
        <AdminOrderTopSection>
          <h3>Order lists</h3>
          <Select placeholder="Select option" name="order-status">
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCEL">Cancel</option>
            <option value="INITIATED">Initiated</option>
          </Select>
          <Select placeholder="Select option" name="delivery-status">
            <option value="ORDERED">Ordered</option>
            <option value="PACKED">Packed</option>
            <option value="OUT_FOR_DELIVERY">out for delivery</option>
            <option value="DELIVERED">delivered</option>
            <option value="CANCELED">canceled</option>
          </Select>
          <Select placeholder="Select option" name="payment-wise">
            <option value="COD">Cash on delivery</option>
            <option value="ONLINE">Paid</option>
          </Select>
        </AdminOrderTopSection>
        <AdminOrders></AdminOrders>
      </div>
    </AdminOrderContainers>
  );
};

const AdminOrderContainers = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #c0dadf;
  padding: 1em 2em;
  min-height: 34em;

  .admin-order-content {
    border-radius: 5px;
    background-color: white;
  }
`;

const AdminOrderTopSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AdminOrders = styled.div``;
export default ViewOrders;
