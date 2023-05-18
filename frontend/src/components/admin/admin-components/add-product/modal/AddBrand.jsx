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
  useToast,
} from "@chakra-ui/react";
import { addBrand } from "../../../../../api/Admin";
import styled from "styled-components";
const AddBrand = ({ isOpen, onClose, onSubmit }) => {
  const [brandName, setBrandName] = useState("");

  const toast = useToast({
    position: "top-right",
    duration: 2000,
    isClosable: true,
  });

  const handleSave = async () => {
    try {
      if (!brandName) {
        toast({
          title: "brand name is required",
          status: "warning",
        });
        return;
      }
      const data = await addBrand(brandName);
      setBrandName("");
      toast({
        title: data.message,
        status: "success",
      });
      onClose();
      await onSubmit();
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Brand Modal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <FormLabel>Enter brand name</FormLabel>
            <Input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </Container>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export default AddBrand;
