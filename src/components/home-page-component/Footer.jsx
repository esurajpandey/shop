import React from "react";
import styled from "styled-components";
import { navLinks } from "../Navbar/Navbar.styled";
import { Link } from "react-router-dom";

const address = "15 Main Road Gobichettipalayam, Erode 638452, Tamil Nadu";
const customerSupportLink = [
  { title: "Contact Us", path: "/contactus" },
  { title: "Help Center", path: "/help" },
  { title: "About Us", path: "/about" },
];

const policyLink = [
  { title: "Return policy", path: "/return-policy" },
  { title: "Terms & conditions", path: "terms" },
  { title: "Payment method", path: "payment-method" },
  { title: "FAQ" },
];

const Footer = () => {
  return (
    <FooterContainer>
      <FooterColumn>
        <FooterHead>Store Location</FooterHead>
        <FooterBody>{address}</FooterBody>
      </FooterColumn>
      <FooterColumn>
        <FooterHead>Shop</FooterHead>
        <FooterBody>
          {navLinks.map((item) => {
            return (
              <Link to={item.path} key={item.name}>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </FooterBody>
      </FooterColumn>
      <FooterColumn>
        <FooterHead>Customer support</FooterHead>
        <FooterBody>
          {customerSupportLink.map((item) => {
            return (
              <Link to={item.path} key={item.title}>
                {item.title}
              </Link>
            );
          })}
        </FooterBody>
      </FooterColumn>
      <FooterColumn>
        <FooterHead>Policy</FooterHead>
        <FooterBody>
          {policyLink.map((item) => {
            return (
              <Link to={item.path} key={item.title}>
                {item.title}
              </Link>
            );
          })}
        </FooterBody>
      </FooterColumn>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  background-color: black;
  font-family: "Poppins";
  min-height: 20em;
  justify-content: space-around;
  color: white;
  display: flex;
  width: 100%;
`;

const FooterHead = styled.div`
  font-size: 1.2rem;
  font-family: "Hind";
  font-weight: 700;
`;

const FooterBody = styled.div`
  display: flex;
  flex-direction: column;

  a {
    &:hover {
      text-decoration: underline;
      color: white;
    }
  }
`;
const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 12em;
  margin-top: 2rem;
`;
export default Footer;
