import React, { useState } from "react";
import styled from "styled-components";
import { MenuContents } from "./AdminMenu.helper";
import { Link } from "react-router-dom";
const AdminMenu = () => {
  const [active, setActive] = useState("Analytics");

  return (
    <AdminSideMenuMainConatiner>
      {MenuContents.map((item) => {
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
    </AdminSideMenuMainConatiner>
  );
};

const AdminSideMenuMainConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 85.5vh;
  min-width: 15em;
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
    }
    span {
      font-family: Arial, Helvetica, sans-serif, sans-serif;
      text-transform: uppercase;
      /* font-weight: 700; */
      width: 100%;
      font-size: 0.8rem;
      /* color: #867979; */
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

export default AdminMenu;
