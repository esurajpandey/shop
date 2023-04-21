import React from "react";
import styled from "styled-components";
import AdminMenu from "../../components/admin/side-menu/AdminMenu";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../../components/admin/admin-components/add-product/AddProduct";
import UpdateProduct from "../../components/admin/admin-components/update-product/UpdateProduct";
import ViewOrders from "../../components/admin/admin-components/view-orders/ViewOrders";
import AddSupplier from "../../components/admin/admin-components/supplier/AddSupplier";
import AddWorker from "../../components/admin/admin-components/worker/AddWorker";
import ViewWorker from "../../components/admin/admin-components/worker/ViewWorker";

const AdminPage = () => {
  return (
    <AdminMainContainer>
      <AdminMenu />
      <AdminComponents>
        <Routes>
          <Route path="/" exact element={<AddProduct />} />
          <Route path="/add-product" exact element={<AddProduct />} />
          <Route path="/update-product" element={<UpdateProduct />} />
          <Route path="/order-list" element={<ViewOrders />} />
          <Route path="/add-supplier" element={<AddSupplier />} />
          <Route path="/add-worker" element={<AddWorker />} />
          <Route path="/workers" element={<ViewWorker />} />
        </Routes>
      </AdminComponents>
    </AdminMainContainer>
  );
};

const AdminMainContainer = styled.div`
  display: flex;
  background-color: #fff;
`;

const AdminComponents = styled.div`
  overflow-y: scroll;
  max-height: 85.5vh;
  width: 100%;
`;
export default AdminPage;
