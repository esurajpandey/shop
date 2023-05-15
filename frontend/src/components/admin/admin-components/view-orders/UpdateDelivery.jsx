import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Select,
    useToast
  } from '@chakra-ui/react'
import { assignWorker, getWorkers } from '../../../../api/Admin';

const UpdateDelivery = ({isOpen,onClose,order}) => {
  const [selectedWorker,setSelectedWorker] = useState(order.worker.id || '');
  const [workers, setworkers] = useState([]);
  const toast = useToast({
    isClosable: true,
    position : "top-right",
    duration : 2000
  })

  const fetchWorkers = async () => {
    try {
      const worker = await getWorkers(1);
      setworkers(worker.data);
    } catch (err) {
      console.log(err);
    }
  };


  const handleAssignWorker = async () => {
    try{
      if(!selectedWorker){
        toast({
          title : "Please select ra worker",
          status : "warning"
        })
        return;
      }
      console.log(selectedWorker);
      const data = await assignWorker(order.id,selectedWorker);

      toast({
        title : data.message,
        status : "success"
      });
      onClose();
    }catch(err){
      toast({
        title : err.message,
        status : "error"
      })
    }finally{

    }
  }

  useEffect(() => {
    fetchWorkers();
  }, []);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay  
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent>
          <ModalHeader>Select worker for this order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select 
              placeholder='Select delivery guy' 
              defaultValue={selectedWorker.name} 
              isDisabled={order.deliveryStatus === 'DELIVERED' || order.deliveryStatus==='CANCELED'}
              onChange={e => setSelectedWorker(e.target.value)}
              >
      
              {workers.length > 0 && workers.map(worker => {
                return <option key={worker.id} value={worker.id}>{worker.name}</option>
              })}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleAssignWorker}>
              Save
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default UpdateDelivery