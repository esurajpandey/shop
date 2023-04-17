import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BottomNavbar from "./BottomNavbar";
import TopNavbar from "./TopNavbar";

import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { TbLogin } from "react-icons/tb";
import { FaShopify } from "react-icons/fa";
import { MdOutlineFavorite } from "react-icons/md";
import { useNavigate } from "react-router-dom";
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
  MenuCss,
  MenuItemCss,
  MiddleContainer,
  NavContainer,
  RightBar,
  SearchBox,
  ShopName,
} from "./Navbar.styled";

import EmailVerifierLink from "./EmailVerifierLink";

function Navbar() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    console.log("In Nva ", userDetails);
    if (!userDetails) {
      navigate("/login");
      return;
    }
    setUser((prev) => userDetails);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };
  return (
    <NavContainer>
      {user && !user?.isEmailVerified && <EmailVerifierLink />}
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

        {user && (
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
                  <MenuItem css={MenuItemCss} onClick={handleLogout}>
                    Logout
                  </MenuItem>
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
              <Link to="/cart">
                <AiOutlineShoppingCart fontSize={"1.5rem"} />
                <span className="cart-count">{0}</span>
              </Link>
            </div>
          </RightBar>
        )}
        {user === null && (
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
