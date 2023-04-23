import React from "react";
import styled from "styled-components";
import { data } from "./Category.helper";
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
            <CategoryCard
              imgSrc={item.imgSrc}
              title={item.title}
              key={item.title}
            />
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
