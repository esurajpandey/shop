import React from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { DiMeteor } from "react-icons/di";
import {useToast} from '@chakra-ui/react';
import { addToWishlist } from "../../api/User";
const rate = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  ZERO: 0,
};

const offers = [
  {
    heading: "Special Price",
    offer: "Get extra 14% off (price inclusive of cashback/coupon)T&C",
  },
  {
    heading: "Bank Offer",
    offer:
      "10% off on Axis Bank Credit Card and EMI Transactions, up to ₹1500, on orders of ₹5,000 and above",
  },
  {
    heading: "Bank Offer",
    offer: "Buy this product and Get Extra ₹50 Off on Select Fans",
  },
];

const ProductSideContainer = ({ product }) => {

  const toast = useToast({
    duration : 4000,
    isClosable : true,
    position : "top-right"
  });
  const processProductHeader = (product) => {
    let category = product?.attributes?.reduce(
      (total, item) => total + " | " + item.value,
      ""
    );
    category = category + " | " + "weight " + product.weight;
    return category;
  };

  const getOverAllRating = (ratings) => {
    let total = ratings.reduce((acc, curr) => acc + rate[curr.rating], 0);
    let averageRating = total / ratings.length;
    let roundedRating = Math.round(averageRating * 100) / 100;
    return roundedRating;
  };

  const getRatingCount = (ratings) => {
    let total = ratings.reduce((acc, curr) => acc + rate[curr.rating], 0);
    return total;
  };

  const handleAddToFavorite = async (productId) => {
    try{
      const data = await addToWishlist(productId);
      toast({
        title : data.message,
        status : "success"
      })
    }catch(err){
      toast({
        title : err.message,
        status : "error"
      })
    }finally{

    }
  };
  return (
    <>
      {product && (
        <ProductDetails>
          <ProductName>
            <b>{product.name}</b>
            {processProductHeader(product)}
          </ProductName>

          <OverallRating>
            <div className="rate-count">
              {getOverAllRating(product.Review)} <AiFillStar />
            </div>
            <span className="rating-details">
              {getRatingCount(product.Review)} Ratings & {product.Review.length}{" "}
              Reviews
            </span>
            <button
              className="wishlistbtn"
              onClick={() => handleAddToFavorite(product.id)}
            >
              Add to wishlist
            </button>
          </OverallRating>
          <PriceDetails>
            <span className="spcl">Special Price</span>
            <span className="pr-price">&#8377; {product.unitPrice}</span>
          </PriceDetails>

          <Offers>
            {offers.map((item) => {
              return (
                <div key={item.offer} className="offers-list">
                  <div className="offer-heading left-title">{item.heading}</div>
                  :<div className="offer-details">{item.offer}</div>
                </div>
              );
            })}
          </Offers>

          <Highlights className="detail-class">
            <span className="left-title">Warranty : </span>
            <span>N/A</span>
          </Highlights>

          <Details className="detail-class">
            <div className="left-title attribuites-title">
              Specifications -{" "}
            </div>
            <div className="details-lists">
              {product.attributes.map((item) => {
                return (
                  <div key={item.id} className="attribuites-list">
                    <div className="attr-name">{item.name}</div>
                    <div> : </div>
                    <div className="attr-value">{item.value}</div>
                  </div>
                );
              })}
            </div>
          </Details>
          <Description className="detail-class">
            <span className="left-title">Decscription </span>
            <span> : {product.description}</span>
          </Description>

          <Description className="detail-class">
            <span className="left-title">Brand : </span>
            <span>{product.brand.name}</span>
          </Description>
          <Categories className="detail-class">
            <span className="left-title">Categories</span>
            <div className="row-val category">
              {product.category.map((item) => {
                return (
                  <span key={item.id} className="cate-list">
                    <DiMeteor />
                    {`${item.name}  `}{" "}
                  </span>
                );
              })}
            </div>
          </Categories>
          <Ratings></Ratings>
        </ProductDetails>
      )}
    </>
  );
};

const ProductDetails = styled.div`
  width: 100%;
  overflow: auto;
  padding: 0 1.5em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  font-family: "Noto Serif";

  .left-title {
    display: flex;
    font-size: 1rem;
    font-weight: 600;
  }

  .row-val {
    display: flex;
  }

  .detail-class {
    display: flex;
    gap: 0.7rem;
  }

  .wishlistbtn {
    display: flex;
    border: 0;
    color: #043e40;
    font-family: "Zilla Slab";
    font-size: 1.1rem;
    &:hover {
      border: 0;
      text-decoration: underline;
    }
  }
`;

const ProductName = styled.div`
  font-family: "Zilla Slab";
  font-size: 1.5rem;
  font-weight: 500;
`;
const OverallRating = styled.div`
  display: flex;
  align-items: center;

  .rating-details {
    display: flex;
    color: #63625f;
    font-weight: 600;
  }
  .rate-count {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #01331e;
    color: white;
    padding: 0.1em 0.4em;
    border-radius: 5px;
    font-weight: 600;
    svg {
      font-size: 1rem;
    }
  }
  gap: 0.5em;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;

  .attribuites-list {
    display: flex;
    gap: 2rem;
  }
  .attribuites-title {
    display: flex;
  }
  .details-lists {
    display: flex;
    margin-left: 2rem;
    flex-direction: column;
    gap: 0.4rem;
  }

  .attr-name {
    font-weight: 600;
    color: #047529;
  }
`;

const PriceDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  gap: 0.2em;
  .spcl {
    font-weight: 600;
    color: #02493a;
    font-size: 0.9rem;
  }
  .pr-price {
    font-size: 1.7rem;
    font-family: "Alkatra";
  }
`;

const Offers = styled.div`
  /* border: 1px solid red; */
  display: flex;

  flex-direction: column;
  gap: 0.2em;

  .offers-list {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 0.2rem;
    /* flex-wrap: wrap; */
  }

  .offer-heading {
    display: flex;
    font-weight: 600;
    flex-wrap: wrap;
  }

  .offer-details {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
  }
`;

const Highlights = styled.div``;

const Description = styled.div``;

const Categories = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  .category {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .cate-list {
    display: flex;
    align-items: center;
  }
`;

const Ratings = styled.div``;

export default ProductSideContainer;
