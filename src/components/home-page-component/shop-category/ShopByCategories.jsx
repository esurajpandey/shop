import React from "react";
import styled from "styled-components";
import { data } from "./Category.helper";
import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";
const ShopByCategories = () => {
  return (
    <ShopByCategoryContainer>
      <div className="shop-category-title">
        <h2>Shop by Category</h2>
      </div>
      <CategoryContainer>
        {data.map((item) => {
          return (
            <Link to={`/${item.path}`}>
              <CategoryCard
                imgSrc={item.imgSrc}
                title={item.title}
                key={item.title}
              />
            </Link>
          );
        })}
      </CategoryContainer>
    </ShopByCategoryContainer>
  );
};

const ShopByCategoryContainer = styled.div`
  margin: 0.8em 3em;
  margin-right: 4.5em;
  display: flex;
  flex-direction: column;
  background-color: white;
  min-height: 18em;
  align-items: center;
  padding: 1em;

  @media (max-width: 600px){
    max-width: 100%;
    margin: 1.5em 2.5em;
    overflow: hidden;
  }


`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 3em;
`;

export default ShopByCategories;
