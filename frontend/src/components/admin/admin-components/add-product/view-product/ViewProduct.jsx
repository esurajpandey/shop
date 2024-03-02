import React, { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";

import ReactPaginate from "react-paginate";
import {
  deleteProduct,
  getProductList,
  updateProduct,
} from "../../../../../api/Admin";
import styled from "@emotion/styled";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { productUpdateSchema } from "../../../../../validation/AdminValidation";

const ViewProduct = () => {
  const toast = useToast({
    isClosable: true,
    duration: 7000,
    position: "top-right",
  });
  const [selectedProduct, setSelectedProduct] = useState();
  const [products, setProducts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
  });

  const handleProductEdit = async (values, action) => {
    try {
      const data = await updateProduct(values.id, {
        name: values.name,
        quantityInStock: values.quantityInStock,
        unitPrice: values.unitPrice,
      });
      await fetchProducts(pagination.page);
      onClose();
      toast({
        title: data.message,
        status: "success",
      });
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
      });
    } finally {
    }
  };

  const fetchProducts = async (page) => {
    try {
      const data = await getProductList(page);
      setProducts(data.data.products);
      setPagination((prev) => ({ ...prev, total: data.data.total }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const data = await deleteProduct(productId);
      await fetchProducts(pagination.page);
      toast({
        title: data.message,
        status: "success",
      });
    } catch (err) {
      toast({
        title: err.message,
        status: "error",
      });
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const handlePageClick = async (event) => {
    const newOffset = (event.selected * 10) % pagination.total;
    await fetchProducts(event.selected + 1);
    setPagination((prev) => ({ ...prev, page: event.selected }));
  };

  const {
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    values,
  } = useFormik({
    initialValues: {
      id: "",
      name: selectedProduct?.name ?? "",
      quantityInStock: selectedProduct?.quantityInStock ?? 0,
      unitPrice: selectedProduct?.unitPrice ?? 0,
    },
    validationSchema: productUpdateSchema,
    onSubmit: handleProductEdit,
  });

  const handleEditClick = (product) => {
    setSelectedProduct((prev) => product);
    values.id = product.id;
    values.name = product.name;
    values.quantityInStock = product.quantityInStock;
    values.unitPrice = product.unitPrice;
    onOpen();
  };
  return (
    <>
      <WorkerDetailsContainer>
        <div className="top-header">
          <h2 className="supplier-title">Product List</h2>
        </div>

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
                          <MenuItem
                            onClick={() => handleDeleteProduct(product.id)}
                          >
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

        <div className="pagination-container">
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pagination.total / 9}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </WorkerDetailsContainer>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Produc Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Product</FormLabel>
              <Input
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                name="name"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Quantity </FormLabel>
              <Input
                value={values.quantityInStock}
                name="quantityInStock"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Unit Price</FormLabel>
              <Input
                value={values.unitPrice}
                onChange={handleChange}
                name="unitPrice"
                onBlur={handleBlur}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const WorkerDetailsContainer = styled.div`
  height: 100%;
  position: relative;
  .supplier-title {
    color: #515152;
    font-family: "Hind";
    font-weight: 600;
    padding-left: 2rem;
    padding-top: 0.2rem;
    margin: 0;
    font-size: 1.5em;
  }
  .pagination-container {
    position: absolute;
    right: 2rem;
    bottom: 0.2em;
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
