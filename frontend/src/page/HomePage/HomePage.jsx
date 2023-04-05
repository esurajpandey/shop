import React from "react";
import { useParams } from "react-router-dom";
import * as hmCSS from "./HomePage.module.css";
const HomePage = () => {
  const { searchQuery } = useParams();
  // alert(searchQuery);
  const myStyle = {};
  return (
    <div className={hmCSS.title} style={myStyle}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, deleniti
      facilis. Ab necessitatibus nesciunt veritatis sequi iste asperiores,
      suscipit accusamus velit consequatur distinctio voluptatibus expedita
      quasi saepe dolor ipsa excepturi.{" "}
    </div>
  );
};

export default HomePage;
