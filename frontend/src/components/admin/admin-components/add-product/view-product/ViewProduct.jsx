import React, { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import {
  getProductList,
  getSuppliers,
  updateSupplier,
} from "../../../../../api/Admin";
import styled from "@emotion/styled";

const ViewProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSProduct, setSelectedProduct] = useState(null);
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [products, setProducts] = useState([]);

  const handleDelete = () => {};

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);

    setProductName(product.name);
    setProductQuantity(product.quantityInStock);
    setUnitPrice(product.unitPrice);
  };

  const handleSaveClick = async () => {
    try {
      //   const data = await updateSupplier(selectedSupplier?.id, {
      //     email: supplierEmail,
      //     name: supplierName,
      //     mobile: mobile,
      //   });

      //   setSuppliers((prev) =>
      //     prev.map((supplier) => {
      //       if (supplier?.id === data?.id) {
      //         return { ...data };
      //       }
      //       return supplier;
      //     })
      //   );

      setShowModal(false);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const fetchSupplier = async () => {
    try {
      const data = await getProductList();
      setProducts(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSupplier();
  }, []);

  return (
    <WorkerDetailsContainer>
      <h2 className="supplier-title">Product List</h2>
      {products.length > 0 && (
        <WorkerDetailsTable>
          <table className="supplier-table">
            <thead className="sticky-header">
              <tr className="top-header">
                <th>Name</th>
                <th>Brand</th>
                <th>Stock Quantity</th>
                <th>Unit Price</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product?.brand?.name}</td>
                  <td>{product?.quantityInStock}</td>
                  <td>{product.unitPrice}</td>
                  <td>
                    <Menu>
                      <MenuButton>
                        <CiMenuKebab />
                      </MenuButton>
                      <MenuList maxWidth={"50px"} maxW={"50px"} w={"2rem"}>
                        <MenuItem onClick={() => handleEditClick(product)}>
                          Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(product.id)}>
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </WorkerDetailsTable>
      )}

      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit supplier Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Product</FormLabel>
                <Input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Quantity </FormLabel>
                <Input
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Unit Price</FormLabel>
                <Input
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSaveClick}>
                Save
              </Button>
              <Button onClick={() => setShowModal(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </WorkerDetailsContainer>
  );
};

const WorkerDetailsContainer = styled.div`
  height: 100%;
  .supplier-title {
    color: #515152;
    font-family: "Hind";
    font-weight: 600;
    padding-left: 2rem;
    padding-top: 0.2rem;
    margin: 0;
    font-size: 1.5em;
  }
`;

const WorkerDetailsTable = styled.div`
  max-height: 80vh; /* Set the maximum height for the table container */
  overflow: auto;
  font-family: "Hind";
  padding: 0 2em;
  border-radius: 0.5em;
  .supplier-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 20px;
    tr {
      &:hover {
        background-color: #e6f4fd;
      }
    }
  }

  .supplier-table th,
  .supplier-table td {
    padding: 10px;
    text-align: left;
    /* padding: 0.8em; */
  }

  .top-header {
    background-color: #e6f4fd;
    border-radius: 5px;
    font-size: 1.2rem;
    font-family: inherit;
    position: sticky;
    top: 0;
    border-radius: 1rem;
    th {
      font-weight: 500;
      font-family: inherit;
    }

    &:hover {
      background-color: #e6f4fd;
    }
  }
`;

export default ViewProduct;
