import React, { useState } from "react";
import styled from "styled-components";
import { MenuList } from "./AccountSideMenu.helper";
import { Link } from "react-router-dom";
const AccountSideMenu = ({ type }) => {
  const [active, setActive] = useState("My Profile");
  return (
    <AccountMenuContainer type={type}>
      {MenuList.map((item) => {
        return (
          <div
            className={`admin-menu-list-items ${
              active === item.title ? "active-menu" : ""
            } `}
            key={item.title}
          >
            <Link onClick={() => setActive(item.title)} to={item.path}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </div>
        );
      })}
    </AccountMenuContainer>
  );
};

const AccountMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: ${({ type }) => (type !== "ADMIN" ? "76.9vh" : "85vh")};
  min-width: 17em;
  align-items: center;
  gap: 0.5em;

  overflow-y: scroll;
  overflow-x: hidden;
  padding-inline: 1.5em;
  padding-top: 1em;
  .active-menu {
    background-color: #ebf0fe;

    span,
    svg {
      color: #3661ed;
    }
  }
  .admin-menu-list-items {
    display: flex;
    align-items: center;
    width: 100%;
    color: gray;
    padding: 0.5em 1em;
    transition-property: background-color;
    transition-duration: 250ms;
    border-radius: 0.4em;
    a {
      display: flex;
      align-items: center;
      gap: 0.5em;
      svg {
        font-size: 1.5rem;
      }
    }
    span {
      font-family: "Hind";
      text-transform: uppercase;
      /* font-weight: 700; */
      width: 100%;
      font-size: 0.95rem;
    }

    &:hover {
      color: #3661ed;
      background-color: #ebf0fe;
      box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
      -webkit-box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 3px 2px 5px 0px rgba(0, 0, 0, 0.75);
    }
  }
`;
export default AccountSideMenu;
