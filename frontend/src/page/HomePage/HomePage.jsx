import React from "react";
import { useParams } from "react-router-dom";
const HomePage = () => {
  const { searchQuery } = useParams();
  // alert(searchQuery);
  const myStyle = {};
  return <div style={myStyle}></div>;
};

export default HomePage;
