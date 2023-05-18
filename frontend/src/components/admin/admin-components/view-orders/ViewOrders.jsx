import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  Skeleton,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { getAllOrders } from "../../../../api/Admin";
import { getFormatedDate } from "../../../order/Order";
import { TbDotsVertical } from "react-icons/tb";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import UpdateOrder from "./UpdateOrder";
import UpdateDelivery from "./UpdateDelivery";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";

const ViewOrders = () => {
  const [query, setQuery] = useState({
    orderStatus: "",
    deliveryStatus: "",
    paymentMode: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderFilter, setOrderFilter] = useState({
    from: "",
    to: "",
  });

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectOrder, setSelectedOrder] = useState({});

  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
  });
  const [models, setModels] = useState({
    orderModal: false,
    selectWorkerModal: false,
  });

  const toast = useToast({
    duration: 7000,
    isClosable: true,
    position: "top-right",
    variant: "solid",
  });

  const handleFetchOrders = async (query) => {
    try {
      setLoading(true);
      const data = await getAllOrders(query);
      setPagination((prev) => ({ ...prev, total: data.data._count.orders }));
      setOrders(data.data.orders);
      console.log(data.data);
    } catch (err) {
      toast({
        title: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchOrders("page=1");
  }, []);

  const getQueryString = () => {
    const queryParams = new URLSearchParams();

    if (query.orderStatus) {
      queryParams.append("orderStatus", query.orderStatus);
    }

    if (query.deliveryStatus) {
      queryParams.append("deliveryStatus", query.deliveryStatus);
    }

    if (query.paymentMode) {
      queryParams.append("paymentMode", query.paymentMode);
    }

    return queryParams;
  };

  const handlePageClick = async (event) => {
    const queryString = getQueryString();
    queryString.append("page", event.selected);
    await handleFetchOrders(queryString.toString());
    setPagination((prev) => ({ ...prev, page: event.selected }));
  };

  const applyFilterForOrder = async () => {
    const queryParams = new URLSearchParams();

    if (orderFilter.from && orderFilter.to) {
      queryParams.append("from", orderFilter.from);
      queryParams.append("to", orderFilter.to);
      handleFetchOrders(queryParams.toString());
    }
    onClose();
  };
  useEffect(() => {
    console.log(getQueryString().toString());
    handleFetchOrders(getQueryString().toString());
  }, [query]);

  const handleOrderUpdateModal = (order) => {
    setSelectedOrder((prev) => ({ ...prev, ...order }));
    setModels((prev) => ({ ...models, orderModal: true }));
  };

  const handleDeliveryUpdateModal = (order) => {
    setSelectedOrder((prev) => ({ ...prev, ...order }));
    setModels((prev) => ({ ...models, selectWorkerModal: true }));
  };

  return (
    <AdminOrderContainers>
      {loading ? (
        <Stack className="stack">
          <Skeleton height="28em" />
        </Stack>
      ) : (
        <div className="admin-order-content">
          <AdminOrderTopSection>
            <Select
              placeholder="Order status"
              name="orderStatus"
              size="sm"
              onChange={(e) =>
                setQuery((prev) => ({ ...prev, orderStatus: e.target.value }))
              }
              value={query.orderStatus}
            >
              <option value="CONFIRMED">Confirmed</option>
              <option value="CANCELED">Cancel</option>
              <option value="INITIATED">Initiated</option>
            </Select>
            <Select
              placeholder="Delivery Status"
              name="delivery-status"
              size="sm"
              value={query.deliveryStatus}
              onChange={(e) =>
                setQuery((prev) => ({
                  ...prev,
                  deliveryStatus: e.target.value,
                }))
              }
            >
              <option value="ORDERED">Ordered</option>
              <option value="PACKED">Packed</option>
              <option value="OUT_FOR_DELIVERY">out for delivery</option>
              <option value="DELIVERED">delivered</option>
              <option value="CANCELED">canceled</option>
            </Select>
            <Select
              placeholder="Payment mode"
              name="payment-wise"
              size="sm"
              value={query.paymentMode}
              onChange={(e) =>
                setQuery((prev) => ({ ...prev, paymentMode: e.target.value }))
              }
            >
              <option value="COD">Cash on delivery</option>
              <option value="ONLINE">Paid</option>
            </Select>
            <div className="date-picker">
              <Button colorScheme="blue" size="sm" onClick={onOpen}>
                Select date
              </Button>
            </div>
          </AdminOrderTopSection>
          <AdminOrders>
            <TableContainer>
              <Table variant="simple">
                {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                <Thead>
                  <Tr>
                    <Th>Customer Name</Th>
                    <Th>Order Status</Th>
                    <Th>Delivery Status</Th>
                    <Th>Order at</Th>
                    <Th>Payment mode</Th>
                    <Th>Mobile</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {orders?.length > 0 &&
                    orders.map((order) => {
                      return (
                        <Tr key={order.id}>
                          <Td>{order.user.name}</Td>
                          <Td>{order.orderStatus.toLowerCase()}</Td>
                          <Td>{order.deliveryStatus.toLowerCase()}</Td>
                          <Td>{getFormatedDate(order.orderAt)}</Td>
                          <Td>{order.payment_mode}</Td>
                          <Td>{order.user.mobile}</Td>
                          <Td>
                            <Menu>
                              <MenuButton>
                                <TbDotsVertical />
                              </MenuButton>
                              <MenuList maxWidth={"1em"} maxW={"1em"} w={"1em"}>
                                <Link to={`/order/${order.id}`}>
                                  <MenuItem>View</MenuItem>
                                </Link>
                                <MenuItem
                                  onClick={() => handleOrderUpdateModal(order)}
                                >
                                  Update Order
                                </MenuItem>
                                <MenuItem
                                  onClick={() =>
                                    handleDeliveryUpdateModal(order)
                                  }
                                >
                                  Select worker
                                </MenuItem>
                              </MenuList>
                            </Menu>
                          </Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </TableContainer>
            <div className="pagination-container">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={Math.ceil(pagination.total / 7)}
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
          </AdminOrders>
        </div>
      )}
      {models.orderModal && (
        <UpdateOrder
          fetchOrders={handleFetchOrders}
          isOpen={models.orderModal}
          onClose={() =>
            setModels((prev) => ({ ...models, orderModal: false }))
          }
          order={selectOrder}
        />
      )}
      {models.selectWorkerModal && (
        <UpdateDelivery
          isOpen={models.selectWorkerModal}
          onClose={() =>
            setModels((prev) => ({ ...models, selectWorkerModal: false }))
          }
          order={selectOrder}
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select date</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <OrderDatePicker>
              <DayPicker
                mode="single"
                selected={orderFilter.from}
                onSelect={(selected) =>
                  setOrderFilter((prev) => ({ ...prev, from: selected }))
                }
                captionLayout="dropdown"
                fromYear={2015}
                toYear={new Date().getFullYear()}
              />
              <DayPicker
                mode="single"
                selected={orderFilter.to}
                onSelect={(selected) =>
                  setOrderFilter((prev) => ({ ...prev, to: selected }))
                }
                captionLayout="dropdown"
                fromYear={2015}
                toYear={new Date().getFullYear()}
              />
            </OrderDatePicker>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={applyFilterForOrder}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </AdminOrderContainers>
  );
};

const OrderDatePicker = styled.div`
  display: flex;
`;

const AdminOrderContainers = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #c0dadf;
  padding: 0 2em;
  padding-top: 1em;
  min-height: 34em;
  position: relative;
  .admin-order-content {
    border-radius: 5px;
    background-color: white;
  }

  .pagination-container {
    position: absolute;
    right: 2rem;
    bottom: 0.05em;
  }
`;

const AdminOrderTopSection = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0.5em;
  gap: 0.5em;
`;

const AdminOrders = styled.div`
  margin-top: 0.5em;
`;
export default ViewOrders;
