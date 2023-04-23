import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { navLinks } from "./Navbar.styled";
import { FaBars } from "react-icons/fa";

const BottomNavbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <BottomNavContainer isVisible={open}>
      <nav className="navbar">
        <div className="navbar-links">
          <div className="toggle-btn">
            <FaBars onClick={() => setOpen(!open)} fontSize="1.5rem" />
          </div>
          <ul>
            {navLinks.map((item) => {
              return (
                <li key={item.name}>
                  <Link to={`/${item.path}`}>{item.name}</Link>
                </li>
              );
            })}
            <li key={"login-link"} className="login-link">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    </BottomNavContainer>
  );
};

const BottomNavContainer = styled.div`
  /* width: 100vw; */
  display: flex;
  flex-direction: column;
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    background: #3c4a66;
  }

  .navbar-links {
    ul {
      margin: 0;
      padding: 0;
      display: flex;
      li {
        list-style: none;

        a {
          text-decoration: none;
          color: white;
          padding: 0.5rem;
          display: block;
          transition: 0.3s ease-out;
          :hover {
            background-color: #9c9494;
          }
        }
      }
    }

    .login-link {
      display: none;
    }
  }

  .toggle-btn {
    display: none;
    align-items: center;
    justify-content: center;
    padding: 0.1rem;
    color: white;
    margin-bottom: 4px;
    :hover {
      color: #19af82;
    }
  }

  @media (max-width: 800px) {
    .toggle-btn {
      display: flex;
    }

    .navbar-links {
      /* display: none; */
      width: 100%;
      ul {
        display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
        width: 100%;
        flex-direction: column;
        li {
          text-align: center;
          a {
            padding: 0.5rem 1rem;
          }
        }
        .login-link {
          /* display: flex;
          align-items: center;
          justify-content: center;
          width: 100%; */
          display: block;
        }
      }

      .active {
        display: flex;
      }
    }

    .navbar {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++//

export default BottomNavbar;
