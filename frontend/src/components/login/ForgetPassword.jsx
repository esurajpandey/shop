import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  Input,
  FormControl,
} from "@chakra-ui/react";
import styled from "styled-components";

const ForgetPassword = ({ isOpen, onClose }) => {
  const [otpSent, setOtpSent] = useState(false);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Forget password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ForgetForm>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter your email address.." />
              <button className="send-otp">Send otp</button>
            </FormControl>

            {true && (
              <FormControl>
                <FormLabel>Enter otp sent to your email</FormLabel>
                <Input
                  type="text"
                  placeholder="Otp value"
                  htmlSize={7}
                  width="auto"
                />
              </FormControl>
            )}
          </ForgetForm>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ForgetForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7em;

  .send-otp {
    display: flex;
    align-items: flex-end;
    border: 0;
    margin-top: 0.3em;
    font-size: 0.9rem;

    &:hover {
      color: #f97b22;
      text-decoration: underline;
    }
  }
`;

export default ForgetPassword;
