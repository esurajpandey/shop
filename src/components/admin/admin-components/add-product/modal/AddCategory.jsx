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
  useToast,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { addCategory } from "../../../../../api/Admin";
const AddCategory = ({ isOpen, onClose, onSubmit, fetchCateory }) => {
  const [category, setCategory] = useState();
  const toast = useToast({
    position: "top-right",
    duration: 2000,
    isClosable: true,
  });
  const handleSave = async () => {
    try {
      if (!category) {
        toast({
          title: "Category is required",
          status: "warning",
        });
        return;
      }
      const data = await addCategory(category);
      setCategory("");
      toast({
        title: data.message,
        status: "success",
      });
      onClose();
      await fetchCateory();
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
        <ModalHeader>Category Modal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <FormLabel>Enter category name</FormLabel>
            <Input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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

export default AddCategory;
