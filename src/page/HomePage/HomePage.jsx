import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../components/home-page-component/Footer";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import LatestItem from "../../components/home-page-component/LatestItem";
import OfferSection from "../../components/home-page-component/offer-section/OfferSection";
import DescriptionSection from "../../components/home-page-component/DescriptionSection";
import BestSeller from "../../components/home-page-component/best-seller/BestSeller";
import ShopByCategories from "../../components/home-page-component/shop-category/ShopByCategories";
import BestPrice from "../../components/home-page-component/BestPrice";
import NewLetterSection from "../../components/home-page-component/NewLetterSection";
import HelpCenterSection from "../../components/home-page-component/HelpCenterSection";
const HomePage = () => {
  const { searchQuery } = useParams();

  return (
    <HomePageContainer>
      <div className="home-body">
        <LatestItem />
        <OfferSection /> {/*Error for sizing */}
        <DescriptionSection />
        <BestSeller />
        <ShopByCategories />
        <BestPrice />
        <NewLetterSection />
        <HelpCenterSection />
      </div>
      <FooterArea>
        <Footer />
      </FooterArea>
    </HomePageContainer>
  );
};

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  height: 100%;
  /* border: 1px solid red; */
  background-color: #edecec;
  box-sizing: border-box;
  .home-body {
    display: flex;
    flex-direction: column;
  }
`;

const FooterArea = styled.section`
  display: flex;
`;

export default HomePage;
