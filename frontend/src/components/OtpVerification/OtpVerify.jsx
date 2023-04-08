import { Button, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import styled from "styled-components";
import otpImage from "../../assets/otp.webp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  DetailsContainer,
  OtpFormContainer,
  OtpMainConatiner,
  OtpVerifyContainer,
} from "./OtpVerify.styled";

const OtpVerify = () => {
  const user = {
    name: "Suraj Kumar Pandey",
    email: "esurajpandey@gmail.com",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [otpValue, setOtpValue] = useState();
  const toast = useToast();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setOtpValue(e.target.value);
    }
  };

  const sendOtp = async (e) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/user/send-new-otp", {
        email: user?.email,
      });

      console.log(data);
      toast({
        title: data?.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setIsLoading(false);
    } catch (err) {
      console.log(err.response.data);
      toast({
        title: err?.response?.data?.message,
        description: "Inavlid email and password",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setIsLoading(false);
      return;
    }
  };

  const verifyAccount = async () => {
    setIsLoading(true);
    if (!otpValue) {
      toast({
        title: "Otp should not be empty",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios.post("/api/user/verify-email", {
        email: user.email,
        otp: otpValue,
      });

      console.log(data);

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.data.name,
          email: data.data.email,
          token: data.token,
        })
      );
      //set user to state
      setIsLoading(false);
      navigate("/all");
    } catch (err) {
      console.log(err.response.data);
      toast({
        title: err?.response?.data?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setIsLoading(false);
      return;
    }
  };

  return (
    <OtpVerifyContainer>
      <OtpMainConatiner>
        <div className="left-otp-container">
          <img src={otpImage} alt="Otp verification" />
        </div>
        <div className="right-otp-container">
          <h1 className="otp-heading">Account verification</h1>
          <DetailsContainer>
            <h2>Welcome {user.name}</h2>
          </DetailsContainer>
          <OtpFormContainer>
            <div className="otp-value-conatainer">
              <input
                type="number"
                pattern="[0-9]*"
                name="otp"
                value={otpValue}
                onChange={handleOnChange}
                placeholder="Enter your otp"
              />
            </div>

            <Button
              variant="solid"
              width={"5em"}
              colorScheme="blue"
              style={{ marginTop: 15 }}
              onClick={verifyAccount}
              isLoading={isLoading}
              background="#245769"
            >
              Varify
            </Button>
          </OtpFormContainer>

          <div className="new-otp">
            <Button
              variant="link"
              colorScheme="cyan"
              width={"100%"}
              style={{ marginTop: 15, padding: "0.2rem" }}
              onClick={sendOtp}
              isLoading={isLoading}
              color="blue"
              border={0}
            >
              Resend a new otp
            </Button>
          </div>
        </div>
      </OtpMainConatiner>
    </OtpVerifyContainer>
  );
};

export default OtpVerify;
