import React from "react";
import styled from "styled-components";
import { BsBoxSeam } from "react-icons/bs";
import { Link } from "react-router-dom";
const TopNavbar = () => {
  return (
    <TopHeaderContainer>
      <div className="left-side">
        <BsBoxSeam />
        <span>Free Shipping for orders over &#8377;500</span>
      </div>
      <div className="right-side">
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/help"}>Help Center</Link>
      </div>
    </TopHeaderContainer>
  );
};

const TopHeaderContainer = styled.div`
  background-color: black;
  width: 100vw;
  height: 3rem;
  color: white;
  display: flex;
  font-family: "Open Sans";

  .left-side {
    display: flex;
    align-items: center;
    width: 50vw;
    padding-left: 2em;
    gap: 0.5em;
    span {
      font-family: inherit;
      font-weight: 400;
      font-size: 1rem;
    }
  }

  .right-side {
    font-family: inherit;
    font-weight: 400;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: right;
    width: 50vw;
    a {
      padding-inline: 1em;
    }
  }

  @media (max-width: 800px) {
    display: none;
  }
`;
export default TopNavbar;
