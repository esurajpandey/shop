import styled from "styled-components";
import { css } from "@emotion/react";

export const navLinks = [
  {
    name: "Shop All",
    path: "category/all"
  },
  {
    name: "Computers",
    path: "category/computers"
  },
  {
    name: "Tables",
    path: "category/tablets"
  },
  {
    name: "Drones & Cameras",
    path: "category/cameras"
  },
  {
    name: "Audio",
    path: "category/audios"
  },
  {
    name: "Mobile",
    path: "category/smartphones"
  },
  {
    name: "T.V. & Home Cinema",
    path: "category/home"
  },
  {
    name: "Wearable Tech",
    path: "category/wearables"
  }
]


export const MenuItemCss = css`
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
export const MenuCss = css`
    min-width: 10rem;
  `;

export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  z-index: 20;
  width: 100%;
  /* max-width: 95vw; */

  .menu-link{
    text-decoration: none;
    &:hover{
      color: black;
    }
  }
  
`;

export const MiddleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  max-width: 100vw;
  min-width: 100vw;
  padding: 1rem 0;
  overflow:hidden;
  .leftBar {
    display: flex;
    align-items: center;
    gap : 1rem;
    height: 100%;
    /* width: 50%; */
    padding-left: 1rem;
    /* border: 1px solid green; */
  }

  .shop-name{
    &:hover{
      color: black;
    }
  }

  @media (max-width: 800px) {
    flex-direction: column;
    gap:1rem;
    /* background-color: black; */

    .leftBar{
      justify-content: space-between;
      flex-direction: column;
    }
  }
`;
export const ShopName = styled.div`
  display: flex;
  /* border: 1px solid green; */
  transition: 500ms ease-in;
  h1{
    font-family: 'Brush Script';
    font-weight: 900;
    /* color:white; */
  }
  @media (max-width: 600px) {
    h1{
      font-size: 3rem;
    }
    .shop-icon{
      font-size: 3rem;
    }
  }
  &:hover{
    transform: scale(1.02);
  }
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  border-radius: 30px;
  padding: 0.08em;
  margin: 0 auto;
  outline: 1px solid black;
  background-color: transparent;
  input {
    border: 0;
    flex: 1;
    font-size: 16px;
    background-color: transparent;
    border-radius: 30px;
    padding: 5px 9px;

    :focus {
      outline: none;
      border: none;
    }
  }

  button {
    background-color: transparent;
    border: none;
    padding: 0 10px;
    font-size: 16px;
    color: #555;
    cursor: pointer;
    :hover {
      border: 0;
      outline: none;
    }
    .search-icon {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 600px){
    max-width: 700px;
    width: 25rem;
  }
`;

export const RightBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 2rem;
  /* border: 1px solid blue; */
  gap : 1rem;
  width: 50%;
  height: 100%;
  .nav-btns {
    display: flex;
    align-items: center;
    font-family: "Changa One";
    a {
      display: flex;
      align-items: center;
      gap: 0.4em;
      text-decoration: none;
      color: black;
      :hover {
        color: black;
        text-decoration: underline;
      }
    }
    .cart-count {
      font-size: 0.75rem;
      padding: 0 0.3em;
      background-color: black;
      border-radius: 100%;
      color: white;
      /* margin-left: -0.3em; */
      position: absolute;
      transform: translateX(20px) translateY(-10px);
    }
  }

  @media (max-width: 800px){
    /* padding-bottom: 1rem; */
    /* flex-direction: row-reverse; */
    .cart{
      margin-left: 1rem;
    }

    .favorite{
      display: none;
    }
  }
`;

