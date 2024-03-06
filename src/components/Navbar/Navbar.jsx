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
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    if (!userDetails) {
      navigate("/login");
    }
    setUser(userDetails);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload(true);
    return navigate("/login");
  };

  const handleSearch = () => {
    if (search !== "") {
      setSearch("");
      navigate(`/search/${search}`);
    }
  };
  return (
    <NavContainer>
      {user && !user?.isEmailVerified && <EmailVerifierLink />}
      <MiddleContainer>
        <div className="leftBar">
          <ShopName>
            <FaShopify fontSize={"2.5rem"} className="shop-icon" />
            <Link to="/" className="shop-name">
              <h1>Sathieh Mill Stores</h1>
            </Link>
          </ShopName>
          <SearchBox>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>
              <AiOutlineSearch className="search-icon" />
            </button>
          </SearchBox>
        </div>

        {user && (
          <RightBar>
            <div className="nav-btns favr">
              <Link to="/favorites">
                <MdOutlineFavorite fontSize={"1.5rem"} />
                <span className="favorite">Favorites</span>
              </Link>
            </div>

            <div className="nav-btns cart">
              <Link to="/cart">
                <AiOutlineShoppingCart fontSize={"1.5rem"} />
                {/* <span className="cart-count">{0}</span> */}
              </Link>
            </div>

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
                  <Link to={"/orders"} className="menu-link">
                    <MenuItem css={MenuItemCss}>My Orders</MenuItem>
                  </Link>
                  {user.type === "WORKER" && (
                    <Link to={"/deliveries"} className="menu-link">
                      <MenuItem css={MenuItemCss}>Deliveries</MenuItem>
                    </Link>
                  )}
                  <Link to={"/account"} className="menu-link">
                    <MenuItem css={MenuItemCss}>My Account</MenuItem>
                  </Link>

                  {user.type === "ADMIN" && (
                    <Link to="/admin" className="menu-link">
                      <MenuItem css={MenuItemCss}>Admin Control</MenuItem>
                    </Link>
                  )}
                  <MenuItem css={MenuItemCss} onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </ProfileModel>
              </MenuList>
            </Menu>
          </RightBar>
        )}
      </MiddleContainer>
      {/* {user && user?.type === "ADMIN" && <NavButtomLine></NavButtomLine>} */}
      <BottomNavbar />
    </NavContainer>
  );
}

const NavButtomLine = styled.div`
  border: 1px solid black;
`;
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
