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
  useToast,
} from "@chakra-ui/react";

import { getWorkers, removeWorker, updateWorker } from "../../../../api/Admin";
import styled from "@emotion/styled";

const ViewWorker = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [workerName, setWorkerName] = useState("");
  const [workerEmail, setWorkerEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [workers, setworkers] = useState([]);
  const toast = useToast({
    isClosable: true,
    duration: 2000,
    position: "top-right",
  });
  const handleDelete = async (workerId) => {
    try {
      const data = await removeWorker(workerId);
      await fetchWorkers();
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

  const handleEditClick = (worker) => {
    setSelectedWorker(worker);
    setShowModal(true);

    setWorkerName(worker.name);
    setWorkerEmail(worker.email);
    setMobile(worker.mobile);
  };

  const handleSaveClick = async () => {
    try {
      const data = await updateWorker(selectedWorker?.id, {
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
      await fetchWorkers();
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
      <h2 className="worker-title">Worker Details</h2>
      <WorkerDetailsTable>
        <table className="worker-table">
          <thead className="sticky-header">
            <tr className="top-header">
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => (
              <tr key={worker.id}>
                <td>{worker.name}</td>
                <td>{worker.email}</td>
                <td>{worker.mobile}</td>
                <td>
                  <Menu>
                    <MenuButton>
                      <CiMenuKebab />
                    </MenuButton>
                    <MenuList maxWidth={"50px"} maxW={"50px"} w={"2rem"}>
                      <MenuItem onClick={() => handleEditClick(worker)}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={async () => handleDelete(worker.id)}>
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
  height: 100%;
  .worker-title {
    color: #515152;
    font-family: "Hind";
    font-weight: 600;
    padding-left: 2rem;
    padding-top: 0.2rem;
    margin: 0;
    font-size: 1.5em;
  }
`;

const WorkerDetailsTable = styled.div`
  max-height: 90vh; /* Set the maximum height for the table container */
  overflow: auto;
  font-family: "Hind";
  padding: 0 2em;
  border-radius: 0.5em;
  .worker-table {
    width: 100%;
    tr {
      &:hover {
        background-color: #e6f4fd;
      }
    }
  }

  .worker-table th,
  .worker-table td {
    padding: 8px;
    text-align: left;
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

export default ViewWorker;
