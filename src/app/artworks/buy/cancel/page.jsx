import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from 'next/link';

const page = (props) => {
    const { tranId, artId, userId, amount } = props.searchParams;
    return (
        <section className='grid h-screen place-items-center'>
            <Card className="max-w-fit  shadow-2xl p-5 rounded-xl border">
                <CardHeader className=" grid grid-flow-row w-fit m-auto">
                    <div className=' w-fit m-auto'>
                        <Image
                            alt="logo"
                            height={40}
                            radius="sm"
                            src={'/cross_mark.png'}
                            width={40}

                        />
                    </div>
                    <div className="">
                        <h1 className="text-4xl font-bold w-fit m-auto">Payment Cancel</h1>
                        <p className=" text-xs text-gray-600 font-semibold w-fit m-auto">You cancel your payment process!</p>
                    </div>
                </CardHeader>
                <CardBody>
                    <h2></h2>
                    <p className='relative'>Transaction Id: <span className='w-fit absolute right-0'>{tranId}</span></p>
                    <p className='relative'>Art Id: <span className='w-fit absolute right-0'>{artId}</span></p>
                    <p className='relative'>User Id: <span className='w-fit absolute right-0'>{userId}</span></p>
                    <hr className='px-4' />
                    <p className=' relative'>Amount: <span className='w-fit absolute right-0'>{amount} Tk</span></p>
                </CardBody>
                <hr className=' mx-3' />
                <CardFooter>
                    <Link className=' bg-black p-2 w-full hover:bg-slate-900 text-white rounded-xl text-center font-bold' href="/">
                        Go Back To Home
                    </Link>
                </CardFooter>
            </Card>

        </section>
    )
}

export default page
