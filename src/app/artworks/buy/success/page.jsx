import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from 'next/link';

const page = (props) => {
    const { tranId, artId, userId, ammount } = props.searchParams;
    return (
        <section className='grid h-screen place-items-center'>
            <Card className="max-w-fit  shadow-2xl p-5 rounded-xl border">
                <CardHeader className=" grid grid-flow-row w-fit m-auto">
                    <div className=' w-fit m-auto'>
                        <Image
                            alt="logo"
                            height={40}
                            radius="sm"
                            src={'/check.png'}
                            width={40}

                        />
                    </div>
                    <div className="">
                        <h1 className="text-3xl font-bold w-fit m-auto">Payment Successful</h1>
                        <p className=" text-xs text-gray-600 font-semibold w-fit m-auto">Thank you for your purchase!</p>
                    </div>
                </CardHeader>
                <CardBody>
                    <h2></h2>
                    <p className='relative'>Transaction Id: <span className='w-fit absolute right-0'>{tranId}</span></p>
                    <p className='relative'>Art Id: <span className='w-fit absolute right-0'>{artId}</span></p>
                    <p className='relative'>User Id: <span className='w-fit absolute right-0'>{userId}</span></p>
                    <hr className='px-4' />
                    <p className=' relative'>Ammount: <span className='w-fit absolute right-0'>{ammount} Tk</span></p>
                </CardBody>
                <hr className=' mx-3' />
                <CardFooter>
                    <Link className=' bg-green-500 p-2 w-full hover:bg-green-400 rounded-xl text-center font-bold' href="/user/profile">
                        Go Back To Profile
                    </Link>
                </CardFooter>
            </Card>

        </section>
    )
}

export default page
