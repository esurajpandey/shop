import React, { useEffect, useState } from "react";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { getAnalytics } from "../../../../api/Admin";
import styled from "@emotion/styled";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const Analytics = () => {
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [orderFilter, setOrderFilter] = useState({
    from: "",
    to: "",
  });
  const [selected, setSelected] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast({
    duration: 7000,
    position: "top-right",
    isClosable: true,
  });

  const handleFetchDetails = async (query) => {
    try {
      setLoading(true);
      const data = await getAnalytics(query);
      setDetails(data.data);
      console.log(data.data);
    } catch (err) {
      console.log(err);
      toast({
        title: err.message || "Error in fetching details",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchDetails();
  }, []);

  const applyFilterForOrder = async () => {
    const queryParams = new URLSearchParams();

    if (orderFilter.from && orderFilter.to) {
      queryParams.append("from", orderFilter.from);
      queryParams.append("to", orderFilter.to);
      alert(queryParams.toString());
      await handleFetchDetails(queryParams.toString());
    }
    onClose();
  };

  function formatDate(date) {
    return format(date, "dd-MM-yyyy");
  }

  return (
    <AnalyticsContainer>
      {details && (
        <>
          <OrderData>
            <h3 className="order-title">
              Order details <BsFillCalendarDateFill onClick={onOpen} />
            </h3>
            {orderFilter.from && orderFilter.to && (
              <span>
                Orders between {formatDate(orderFilter.from)} and{" "}
                {formatDate(orderFilter.to)}
              </span>
            )}
            <span>Total Orders : {details?.order}</span>
            <span>Order in this month : {details?.thisMonthOrder}</span>
          </OrderData>
          <UserData></UserData>

          <TotalSell></TotalSell>
          <ProductData></ProductData>
          <SupplyData></SupplyData>
        </>
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
    </AnalyticsContainer>
  );
};

const AnalyticsContainer = styled.div`
  background-color: #c0dadf;
  min-height: 34em;
  padding: 1em;
`;

const OrderData = styled.div`
  display: flex;
  flex-direction: column;
  .order-title {
    display: flex;
    gap: 1em;
    align-items: center;
    svg {
      font-size: 1.5rem;
      &:hover {
        color: #037078;
      }
    }
  }
`;

const OrderDatePicker = styled.div`
  display: flex;
`;
const UserData = styled.div``;
const TotalSell = styled.div``;
const ProductData = styled.div``;
const SupplyData = styled.div``;
export default Analytics;
