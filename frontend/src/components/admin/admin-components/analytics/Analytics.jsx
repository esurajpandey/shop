import React, { useEffect, useState } from "react";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { getAnalytics } from "../../../../api/Admin";
import styled from "@emotion/styled";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { FaUserClock } from "react-icons/fa";
import "react-day-picker/dist/style.css";
import { TbTruckDelivery } from "react-icons/tb";
import { MdDataThresholding, MdDataExploration } from "react-icons/md";
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast({
    duration: 3000,
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
          <AnalyticsCard>
            <TbTruckDelivery fontSize={"3rem"} />
            <OrderData>
              <div className="order-title">
                Order details <BsFillCalendarDateFill onClick={onOpen} />
              </div>
              {orderFilter.from && orderFilter.to && (
                <span>
                  Orders between {formatDate(orderFilter.from)} and{" "}
                  {formatDate(orderFilter.to)}
                </span>
              )}
              <div className="details-container">
                <span className="titles">Total Orders :</span> :
                <span className="details">{details?.order}</span>
              </div>
              <div className="details-container">
                <span className="titles">Order in this month :</span> :
                <span className="details">{details?.thisMonthOrder}</span>
              </div>
            </OrderData>
          </AnalyticsCard>

          <AnalyticsCard>
            <FaUserClock fontSize={"3rem"} />

            <UserData>
              <div className="details-container">
                <span className="titles">Registed Users</span> :
                <span className="details">{details?.totalUser}</span>
              </div>
              <div className="details-container">
                <span className="titles">New User in this month</span> :
                <span className="details">{details?.newUsers}</span>
              </div>
            </UserData>
          </AnalyticsCard>

          <AnalyticsCard>
            <MdDataExploration fontSize={"3rem"} />
            <TotalSell>
              <div className="details-container">
                <span className="titles">Total Sell</span> :
                <span className="details">
                  &#x20B9;{details?.totalSell[0].totalsell}
                </span>
              </div>
            </TotalSell>
          </AnalyticsCard>

          <AnalyticsCard>
            <MdDataThresholding fontSize={"3rem"} />
            <ProductData>
              <div className="details-container">
                <span className="titles">Total Supply :</span>
                <span className="details">
                  {details?.supply._sum?.quantity}
                </span>
              </div>
              <div className="details-container">
                <span className="titles">Total cost :</span>
                <span className="details">
                  &#x20B9;{details?.supply._sum?.unitPrice}
                </span>
              </div>
              <div className="details-container">
                <span className="titles">Product in Stock :</span>
                <span className="details">
                  {details?.product._sum?.quantityInStock}
                </span>
              </div>
            </ProductData>
          </AnalyticsCard>
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
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding-top: 4em;
  align-items: center;
  justify-content: center;
`;

const OrderData = styled.div`
  display: flex;
  flex-direction: column;
  .order-title {
    display: flex;
    gap: 2em;
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
const UserData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
const TotalSell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
const ProductData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
const SupplyData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const AnalyticsCard = styled.div`
  width: 15em;
  height: 25em;
  /* border: 1px solid black; */
  padding: 1em;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: white;
  transition: 500ms ease-in-out;
  .details-container {
    display: flex;
    gap: 0.5em;
    .titles {
      color: #045361;
    }
  }

  box-shadow: 1px 1px 9px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 1px 1px 9px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 1px 9px 0px rgba(0, 0, 0, 0.75);

  &:hover {
    transform: scale(1.05);
  }
`;
export default Analytics;
