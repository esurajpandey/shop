import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserDetails } from "../../../api/User";
const MyProfile = () => {
  const [user, setUser] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetchUser = async () => {
    try {
      const data = await getUserDetails();
      setUser(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <ProfileContainer>
      <div className="title">
        <span>My Profile</span>
        <Button size="sm" colorScheme="green" onClick={onOpen}>
          Edit profile
        </Button>
      </div>
      {user && (
        <div className="my-profile-data">
          <LeftProfileContainer>
            <div className="profile-image-container">
              <Image
                borderRadius="full"
                boxSize="150px"
                src="https://bit.ly/dan-abramov"
                alt="Dan Abramov"
              />
            </div>
          </LeftProfileContainer>
          <RightProfileContainer>
            <div className="personal-details">
              <span className="details-type">Personal details</span>
              <div className="details">
                <table>
                  <tr className="profile-row">
                    <td className="details-title">Name</td>
                    <td className="profile-value">: {user.name}</td>
                  </tr>
                  <tr className="profile-row">
                    <td className="details-title">Email</td>
                    <td className="profile-value">: {user.email}</td>
                  </tr>
                  <tr className="profile-row">
                    <td className="details-title">Mobile</td>
                    <td className="profile-value">: {user.mobile}</td>
                  </tr>
                  <tr className="profile-row">
                    <td className="details-title">Account status</td>
                    <td className="profile-value">
                      : {user.isEmailVerified ? "Activated" : "Not verified"}
                    </td>
                  </tr>
                  <tr className="profile-row">
                    <td className="details-title">Role</td>
                    <td className="profile-value">: {user.type}</td>
                  </tr>
                  <tr className="profile-row">
                    <td className="details-title">Joined</td>
                    <td className="profile-value">
                      :{" "}
                      {`${new Date(user.createdAt).getDate()}-${
                        new Date(user.createdAt).getMonth() + 1
                      }-${new Date(user.createdAt).getFullYear()}`}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </RightProfileContainer>
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay
              backdropFilter="auto"
              backdropInvert="80%"
              backdropBlur="2px"
            />
            <ModalContent>
              <ModalHeader>Update profile</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={user.name}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Mobile Number</FormLabel>
                  <Input
                    type="phone"
                    placeholder="Enter your phone number"
                    value={user.mobile}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="gray" onClick={onClose}>
                  Close
                </Button>
                <Button variant="solid" colorScheme="green">
                  Update
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )}
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  .title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: "Hind";
    font-size: 1.5rem;
    font-weight: 600;
  }

  .my-profile-data {
    display: flex;
    gap: 1em;
    background-color: #ebf0fe;
    padding: 1.4em 2em;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    min-height: 63vh;
    max-height: 72vh;
  }
`;

const LeftProfileContainer = styled.div``;

const RightProfileContainer = styled.div`
  table {
    border-collapse: collapse;
    width: 100%;
    margin-left: 2rem;
    td {
      padding: 0.3em;
      padding-right: 5rem;
    }

    td:first-child {
      text-align: left;
      font-weight: 500;
      color: #4d455d;
    }

    td:last-child {
      text-align: left;
      color: #19a7ce;
    }
  }

  .details-type {
    font-size: 1.5rem;
    font-family: "Hind";
    font-weight: 600;
  }

  /*  */
`;
export default MyProfile;
