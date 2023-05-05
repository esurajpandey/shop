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
import ReactPaginate from "react-paginate";
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
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
  });

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
      setShowModal(false);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const fetchProducts = async (page) => {
    try {
      const data = await getProductList(page);
      setProducts(data.data.products);
      // console.log(data.data.total);
      setPagination((prev) => ({ ...prev, total: data.data.total }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const handlePageClick = async (event) => {
    const newOffset = (event.selected * 10) % pagination.total;
    console.log("Page numer", pagination.page, event.selected);
    await fetchProducts(event.selected);
    setPagination((prev) => ({ ...prev, page: event.selected }));
  };

  return (
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
