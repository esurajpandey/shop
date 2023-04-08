import React from "react";
import { useParams } from "react-router-dom";
const HomePage = () => {
  const { searchQuery } = useParams();
  // alert(searchQuery);
  const myStyle = {};
  return (
    <div style={myStyle}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, deleniti
      facilis. Ab necessitatibus nesciunt veritatis sequi iste asperiores,
      suscipit accusamus velit consequatur distinctio voluptatibus expedita
      quasi saepe dolor ipsa excepturi.{" "}
    </div>
  );
};

export default HomePage;
