import React, { useState } from 'react'
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
    useToast,
    
  } from '@chakra-ui/react'
import styled from 'styled-components'
import { updateDeliveryStatus, updateOrder } from '../../../../api/Admin';


const UpdateOrder = ({isOpen,onClose,order,fetchOrders}) => {
    const [orderStatus,setOrderStatus] = useState(order.orderStatus);
    const [deliveryStatus,setDeliveryStatus] = useState(order.deliveryStatus);
    const [loading,setLoading] = useState(false);
    const toast = useToast({
        isClosable: true,
        position : "top-right",
        duration : 2000
    })
    const handleUpdateOrder = async () => {
        try{
            setLoading(true);

            if(orderStatus === "" && deliveryStatus===''){
                toast({
                    title : "Please select right option",
                    status : "warning"
                })
                return;
            }

            const data = await updateOrder({orderStatus,deliveryStatus},order.id)
            
            toast({
                title : data.message,
                status : "success"
            })
            await fetchOrders("page=1")
            onClose();
        }catch(err){
            toast({
                title : err.message,
                status : "error"
            })
        }finally{
            setLoading(false);
        }
    }
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay  
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent>
          <ModalHeader>Update order</ModalHeader>
          <ModalCloseButton isDisabled={loading}/>
          <ModalBody>
            <OrderUpdateContainer>
                <Select placeholder='Order Status' defaultValue={orderStatus} onChange={e => setOrderStatus(e.target.value)} isDisabled={order.deliveryStatus === 'DELIVERED' || order.deliveryStatus==='CANCELED'}>
                    <option value='CONFIRMED'>Confirmed</option>
                    <option value='INITIATED' disabled>Initiated</option>
                    <option value='FAILED' disabled>Failed</option>
                </Select>

                <Select placeholder='Delivery Status' defaultValue={deliveryStatus} onChange={e => setDeliveryStatus(e.target.value)} isDisabled={order.deliveryStatus === 'DELIVERED' || order.deliveryStatus==='CANCELED'}>
                    <option value="ORDERED" disabled={order.deliveryStatus === 'DELIVERED' || order.deliveryStatus==='CANCELED'}>Ordered</option>
                    <option value="PACKED" disabled={order.deliveryStatus === 'DELIVERED' || order.deliveryStatus==='CANCELED'}>Packed</option>
                    <option value="OUT_FOR_DELIVERY" disabled={order.deliveryStatus === 'DELIVERED' || order.deliveryStatus==='CANCELED'}>out for delivery</option>
                    <option value="DELIVERED" disabled={order.deliveryStatus === 'DELIVERED' || order.deliveryStatus==='CANCELED'}>delivered</option>
                    <option value="CANCELED" disabled={order.deliveryStatus === 'DELIVERED' || order.deliveryStatus==='CANCELED'}>canceled</option>
                </Select>
            </OrderUpdateContainer>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} isLoading={loading}isDisabled={loading || order.deliveryStatus === 'DELIVERED' || order.deliveryStatus==='CANCELED'} onClick={handleUpdateOrder}>
              Save
            </Button>
            <Button variant='ghost' onClick={onClose} isDisabled={loading}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export const OrderUpdateContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap :1rem;
`
export default UpdateOrder