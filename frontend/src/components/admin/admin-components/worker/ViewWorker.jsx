import React, { useEffect, useState } from "react";
import axiox from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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

import { getWorkers, updateWorker } from "../../../../api/Admin";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const ViewWorker = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [workerName, setWorkerName] = useState("");
  const [workerEmail, setWorkerEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [workers, setworkers] = useState([]);

  const handleEditClick = (worker) => {
    setSelectedWorker(worker);
    setShowModal(true);
    setWorkerName(worker.name);
    setWorkerEmail(worker.email);
    setMobile(worker.mobile);
  };

  const handleSaveClick = async () => {
    try {
      const { data } = await updateWorker(selectedWorker?.id, {
        email: workerEmail,
        name: workerName,
        mobile: mobile,
      });

      setworkers((prev) =>
        prev.map((worker) => {
          if (worker?.id === data?.id) {
            return { ...data };
          }
          return worker;
        })
      );
      setShowModal(false);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const fetchWorkers = async () => {
    try {
      const worker = await getWorkers(1);
      setworkers(worker.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  return (
    <WorkerDetailsContainer>
      <Table variant="simple" overflowY="scroll" css={tableCss}>
        <Thead>
          <Tr css={headingCss}>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Joining Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {workers.map((worker) => (
            <Tr key={worker.id}>
              <Td>{worker.name}</Td>
              <Td>{worker.email}</Td>
              <Td>{worker.mobile}</Td>
              <Td>{worker.createdAt}</Td>
              <Td>
                <Button onClick={() => handleEditClick(worker)}>Edit</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Worker Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={workerName}
                  onChange={(e) => setWorkerName(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  value={workerEmail}
                  onChange={(e) => setWorkerEmail(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Contact Number</FormLabel>
                <Input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
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
  padding-left: 2em;
  height: 100%;
`;

const tableCss = css``;

const headingCss = css`
  th {
    position: sticky;
    top: 0em;
    font-weight: 900;
    font-size: 1rem;
    z-index: 2;
  }
`;

export default ViewWorker;
