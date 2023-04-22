import { Button, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
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
import { resendOtp, verifyOtp } from "../../api/User";
import { getUser } from "../../api/commonCall";

const OtpVerify = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [otpValue, setOtpValue] = useState();
  const [user, setUser] = useState();

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
      const data = await resendOtp({ email: user?.email });
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
        title: err?.message,
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
      const bodyData = {
        email: user.email,
        otp: otpValue,
      };
      const data = await verifyOtp(bodyData);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.data.name,
          email: data.data.email,
          token: data.token,
          isEmailVerified: data.data.isEmailVerified,
          type: data.data.type,
        })
      );
      window.location.reload(true);
      navigate("/all");
    } catch (err) {
      console.log(err);
      toast({
        title: err?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const user = getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    if (user?.isEmailVerified) {
      navigate("/all");
      return;
    }
    setUser(user);
  }, []);

  return (
    <OtpVerifyContainer>
      {user && (
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
                Verify
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
      )}
    </OtpVerifyContainer>
  );
};

export default OtpVerify;
