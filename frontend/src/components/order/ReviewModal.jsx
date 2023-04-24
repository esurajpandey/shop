import React, { useState } from "react";
import ReactStars from "react-stars";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";
import styled from "styled-components";
import { addReview } from "../../api/Shop";
const ReviewModal = ({ isOpen, onClose, review, productId, orderId }) => {
  const [rating, setRating] = useState();
  const [comment, setComment] = useState();

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        rating,
        comment,
        productId,
        orderId,
      };
      console.log(reviewData);
      const data = await addReview(reviewData);
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      onClose();
    }
  };

  const rate = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    ZERO: 0,
  };

  const onRateChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Product review</ModalHeader>
        <ModalCloseButton />
        {review ? (
          <ReviewData>
            <span>Rating</span>
            <ReactStars
              count={5}
              size={24}
              color2={"#ffd700"}
              value={rate[review.rating]}
              edit={false}
            />
            <span>Review : {review.comment}</span>
          </ReviewData>
        ) : (
          <ModalBody>
            <RateNow>
              Rate :{" "}
              <ReactStars
                count={5}
                size={24}
                color2={"#ffd700"}
                value={0}
                onChange={onRateChange}
              />
              <Input
                placeholder="Put your comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </RateNow>
          </ModalBody>
        )}
        <ModalFooter>
          {!review && (
            <>
              <Button colorScheme="blue" mr={3} onClick={submitReview}>
                Submit
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ReviewData = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 1.5em;
`;

const RateNow = styled.div`
  /* margin-left: 1em; */
`;
export default ReviewModal;
