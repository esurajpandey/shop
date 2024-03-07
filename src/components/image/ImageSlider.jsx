import React, { useState } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  position: relative;
  max-width: 600px;
  max-height: 600px;
  margin: 0 auto;
  overflow: hidden;
  width: 500px;
  height: 100%;
  padding: 1em;

  @media screen and (max-width : 600px){
    width: 350px;
    height: 500px;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: fill;
  height: 100%;
  border-radius: 15px;
  box-shadow: 1px -2px 18px 2px rgba(0,0,0,0.57);
    -webkit-box-shadow: 1px -2px 18px 2px rgba(0,0,0,0.57);
    -moz-box-shadow: 1px -2px 18px 2px rgba(0,0,0,0.57);
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  padding: 2px 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius:50%;
  color : black;
    background-color: gray;
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }

  ${(props) => props.direction === 'left' && 'left: 0;'}
  ${(props) => props.direction === 'right' && 'right: 0;'}

  span{
    font-size: 2rem;
  }
`;

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <SliderContainer>
      <Button direction="left" onClick={prevImage}><span> &lt; </span></Button>
      <SlideImage src={images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} />
      <Button direction="right" onClick={nextImage}><span>  &gt; </span></Button>
    </SliderContainer>
  );
};

export default ImageSlider;
