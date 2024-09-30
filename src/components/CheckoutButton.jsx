"use client"
import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Image } from "@nextui-org/react";
import Link from 'next/link';

const CheckoutButton = ({ title, category, totalAmount }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [paymentGateway, setPaymentGateway] = useState(null);

    const handleOpen = async () => {
        const res = await fetch("/api/payment/initiate", {
            method: "POST",
            body: JSON.stringify({
                title,
                category,
                totalAmount,
            }),
        })
        const result = await res.json();
        setPaymentGateway(result.data.desc)
        onOpen();
    }

    return (
        <>
            <Button
                onPress={() => handleOpen()}
                className=" w-full py-1 text-2xl rounded-md m-auto text-center block bg-red-500 hover:bg-red-600 font-semibold text-white"
            >
                BUY
            </Button>

            <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}
            >
                <ModalContent className='bg-white'>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Select your payment method</ModalHeader>
                            <ModalBody className='grid grid-cols-6'>
                                {paymentGateway.map((item, index) => {
                                    return <Link className='w-16 h-16 border-2 hover:ring-1 ring-red-500' key={index} href={`${item.redirectGatewayURL}`}><Image src={`${item.logo}`} alt='GatewayImage' /></Link>
                                })}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default CheckoutButton
