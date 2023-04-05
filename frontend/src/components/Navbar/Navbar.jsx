import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BottomNavbar from "./BottomNavbar";
import TopNavbar from "./TopNavbar";
import { css } from "@emotion/react";

import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { TbLogin } from "react-icons/tb";
import { FaShopify } from "react-icons/fa";
import { MdOutlineFavorite } from "react-icons/md";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import ProfileModel from "../profileModel/ProfileModel";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  MiddleContainer,
  NavContainer,
  RightBar,
  SearchBox,
  ShopName,
} from "./source";
function Navbar() {
  const user = {
    name: "Suraj Pandey",
    picture: "",
  };

  const MenuItemCss = css`
    border: none;
    outline: none;
    border-radius: 5px;
    width: 10rem;
    min-width: 9.5rem;
    font-family: "Open-Sans";
    font-size: 1rem;
    :hover {
      background-color: transparent;
      background-color: #8f8a8a;
    }

    :active {
      border: none;
    }

    :focus {
      border: none;
      outline: none;
    }
  `;

  const MenuCss = css`
    min-width: 10rem;
  `;

  return (
    <NavContainer>
      <TopNavbar />
      <MiddleContainer>
        <div className="leftBar">
          <ShopName>
            <FaShopify fontSize={"2.5rem"} className="shop-icon" />
            <h1>Shop Name</h1>
          </ShopName>
          <SearchBox>
            <input type="text" placeholder="Search..." />
            <button class="search-button">
              <AiOutlineSearch className="search-icon" />
            </button>
          </SearchBox>
        </div>
        {user.name ? (
          <RightBar>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon fontSize="1.5rem" color="black" />}
                background="transparent"
                _hover={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                }}
                _active={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                }}
                _focus={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                }}
                border="none"
                outline="none"
              >
                <Avatar
                  size="sm"
                  cursor="pointer"
                  name={user?.name}
                  src={user?.picture}
                />
              </MenuButton>

              <MenuList css={MenuCss}>
                <ProfileModel>
                  <MenuItem css={MenuItemCss}>My Orders</MenuItem>
                  <MenuItem css={MenuItemCss}>My Address</MenuItem>
                  <MenuItem css={MenuItemCss}>My Wishlist</MenuItem>
                  <MenuItem css={MenuItemCss}>My Message</MenuItem>
                  <MenuItem css={MenuItemCss}>My Account</MenuItem>
                  <MenuItem css={MenuItemCss}>Logout</MenuItem>
                </ProfileModel>
              </MenuList>
            </Menu>

            <div className="nav-btns favr">
              <Link to="/favorites">
                <MdOutlineFavorite fontSize={"1.5rem"} />
                <span className="favorite">Favorites</span>
              </Link>
            </div>

            <div className="nav-btns cart">
              <Link>
                <AiOutlineShoppingCart fontSize={"1.5rem"} />
                <span className="cart-count">{0}</span>
              </Link>
            </div>
          </RightBar>
        ) : (
          <LoginBtnContainer>
            <Link to="/login">
              <span>Login</span>
              <TbLogin />
            </Link>
          </LoginBtnContainer>
        )}
      </MiddleContainer>

      <BottomNavbar />
    </NavContainer>
  );
}

const LoginBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  justify-content: right;
  width: 50vw;
  padding-right: 1rem;
  /* border: 1px solid red; */
  a {
    font-family: "Anton";
    font-size: 1.7rem;
    font-weight: 900;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    :hover {
      text-decoration: underline;
      color: black;
    }
  }
  @media (max-width: 800px) {
    display: none;
  }
`;

export default Navbar;
