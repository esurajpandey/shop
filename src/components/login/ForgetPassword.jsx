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
  FormLabel,
  Input,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import styled from "styled-components";
import { forgetPassowrd, resetPassowrd } from "../../api/User";

const ForgetPassword = ({ isOpen, onClose }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState();
  const [password, setPassword] = useState("");

  const toast = useToast({
    isClosable: true,
    duration: 6000,
    position: "top-right",
    variant: "solid",
  });

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      // validateEmail(email)
      if (!email) {
        toast({
          title: "Please enter email address",
          status: "error",
        });
        return;
      }
      const data = await forgetPassowrd(email);
      setOtpSent(true);
      toast({
        title: data?.message ?? "Otp has been sent",
        status: "success",
        isClosable: true,
        description: "Check your email",
        duration: 7000,
      });
    } catch (err) {
      toast({
        title: err?.message ?? "Unable to sent otp",
        status: "error",
        duration: 7000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!password || !email || !otp) {
        toast({
          title: "Required data is missing",
          description: "Please make sure you entered all the values",
          status: "error",
        });
        return;
      }
      const passwordData = {
        email,
        password,
        otp,
      };
      const data = await resetPassowrd(passwordData);

      toast({
        title: data.message,
      });
      setOtp(false);
      onClose();
    } catch (err) {
      toast({
        title: err?.message ?? "Unable to reset password now!",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Forget password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ForgetForm>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email address.."
                disabled={otpSent}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="send-otp"
                onClick={handleSendOtp}
                disabled={loading}
              >
                Send otp
              </button>
            </FormControl>

            {otpSent && (
              <div className="password-form">
                <FormControl>
                  <FormLabel>Enter otp sent to your email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Otp value"
                    htmlSize={7}
                    width="auto"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Enter new password</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your new password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </div>
            )}
          </ForgetForm>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            isDisabled={!otpSent}
          >
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ForgetForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7em;

  .send-otp {
    display: flex;
    align-items: flex-end;
    border: 0;
    margin-top: 0.3em;
    font-size: 0.9rem;

    &:hover {
      color: #f97b22;
      text-decoration: underline;
    }
  }

  .password-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export default ForgetPassword;
