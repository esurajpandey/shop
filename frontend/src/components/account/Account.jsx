import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AccountSideMenu from "./account-menu/AccountSideMenu";
import { Route, Routes } from "react-router-dom";
import MyProfile from "./account-pages/MyProfile";
import MyAddress from "./account-pages/MyAddress";
import ChangeEmail from "./account-pages/ChangeEmail";
import ChangePassword from "./account-pages/ChangePassword";
import MyData from "./account-pages/MyData";
import { getUser } from "../../api/commonCall";

const Account = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const data = getUser();
    if (data) {
      setUser(data);
    }
  }, []);
  return (
    <AccountMainContainer type={user.type}>
      {user && (
        <>
          <AccountSideMenu type={user.type} />
          <AccountBody type={user?.type}>
            <Routes>
              <Route path="/" exact element={<MyProfile />} />
              <Route path="/address" exact element={<MyAddress />} />
              <Route path="/change-email" exact element={<ChangeEmail />} />
              <Route
                path="/change-password"
                exact
                element={<ChangePassword />}
              />
              <Route path="/my-data" exact element={<MyData />} />
            </Routes>
          </AccountBody>
        </>
      )}
    </AccountMainContainer>
  );
};

const AccountMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  max-height: ${({ type }) => (type !== "ADMIN" ? "75.5vh" : "85.5vh")};
`;

const AccountBody = styled.div`
  max-height: ${({ type }) => (type !== "ADMIN" ? "85.5vh" : "85.5vh")};
  overflow-y: scroll;
  width: 100%;
  padding: 1em 2em;
`;
export default Account;
