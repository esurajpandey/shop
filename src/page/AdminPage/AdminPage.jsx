import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminMenu from "../../components/admin/side-menu/AdminMenu";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddProduct from "../../components/admin/admin-components/add-product/AddProduct";
import UpdateProduct from "../../components/admin/admin-components/update-product/UpdateProduct";
import ViewOrders from "../../components/admin/admin-components/view-orders/ViewOrders";
import AddSupplier from "../../components/admin/admin-components/supplier/AddSupplier";
import AddWorker from "../../components/admin/admin-components/worker/AddWorker";
import ViewWorker from "../../components/admin/admin-components/worker/ViewWorker";
import ViewSupplier from "../../components/admin/admin-components/supplier/Suppliers";
import { getUser } from "../../api/commonCall";
import { useToast } from "@chakra-ui/react";
import Analytics from "../../components/admin/admin-components/analytics/Analytics";
import ViewProduct from "../../components/admin/admin-components/add-product/view-product/ViewProduct";
const AdminPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const toast = useToast();

  useEffect(() => {
    const data = getUser();

    if (!data) {
      return navigate("/login");
    }
    if (data && data?.type !== "ADMIN") {
      toast({
        title: "Only admin can access",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return navigate("/all");
    }

    setUser(user);
  }, []);
  return (
    <AdminMainContainer>
      <AdminMenu />
      <AdminComponents>
        <Routes>
          <Route path="/" exact element={<Analytics />} />
          <Route path="/add-product" exact element={<AddProduct />} />
          <Route path="/update-product" element={<UpdateProduct />} />
          <Route path="/order-list" element={<ViewOrders />} />
          <Route path="/add-supplier" element={<AddSupplier />} />
          <Route path="/add-worker" element={<AddWorker />} />
          <Route path="/workers" element={<ViewWorker />} />
          <Route path="/suppliers" element={<ViewSupplier />} />
          <Route path="/product-list" element={<ViewProduct />} />
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
