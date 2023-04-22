import React from "react";

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

const AddAttributes = ({
  isOpen,
  onClose,
  onSubmit,
  atrName,
  atrValue,
  setName,
  setValue,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Attribute Modal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormAttribute>
            <div className="attr-name-data">
              <label htmlFor="name">Attribute name</label>
              <Input
                placeholder="Enter attribute name"
                size="md"
                value={atrName}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="attr-value-data">
              <label htmlFor="value">Attribute value</label>
              <Input
                placeholder="Enter attribute value"
                size="md"
                value={atrValue}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </FormAttribute>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={onSubmit}>
            Add attribute
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const FormAttribute = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default AddAttributes;
