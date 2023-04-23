import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  {
    url: "https://lh5.googleusercontent.com/xo6zDzj4Mq8JTuh31DRdzWPkmeekU1ykdvy7gmdGNkBnVzHoULgCA_MpL1ybOV2GKEkbvmswUl0iQW0lvnNQe3gqOFi_-bbt3MBzOAla29FvVN753jPZS87Bn7HyXoQ-dwA-ioYg",
  },
  {
    url: "https://cdn.thomasnet.com/insights-images/eaf2ea91-c0ca-488d-ab63-af480b6f78cb/750px.png",
  },
  {
    url: "https://moneyinc.com/wp-content/uploads/2018/11/Willow-750x500.jpg",
  },
  {
    url: "https://japan.stripes.com/sites/default/files/styles/community_site_carousel_750x500/public/article-images/main_13.jpg?itok=_GELFbpY",
  },
];

const Images = ({ pictures }) => {
  const styleObj = {
    borderRadius: "5px",
  };
  const [imageSet, setImageSet] = useState([]);

  useEffect(() => {
    const res = pictures.map((item) => {
      return {
        url: item,
      };
    });
    setImageSet(res);
  }, [pictures]);
  return (
    <ImageSliderContainer>
      {imageSet.length > 0 && (
        <SimpleImageSlider
          width={500}
          height={400}
          images={imageSet}
          style={styleObj}
          showBullets={true}
          showNavs={true}
          autoPlayDelay={2.0}
        />
      )}
    </ImageSliderContainer>
  );
};

const ImageSliderContainer = styled.div``;
export default Images;
