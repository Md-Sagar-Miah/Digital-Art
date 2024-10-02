import React from 'react'
import Link from 'next/link';
import { Card, CardHeader, CardFooter, Image } from "@nextui-org/react";
const getNewestArtsData = async () => {
    const res = await ((await fetch(`${process.env.BASE_URL}/api/artworks/arts/newest`)).json())
    return res["data"];
}

const Newest = async () => {
    const newestArts = await getNewestArtsData()
    return (
        <section className='px-1 sm:px-4 md:px-8 lg:px-20 py-8'>
            <span className='w-full block overflow-hidden shadow-2xl border-b-2 mb-4 bg-green-50 border-black text-red-500' >
                <h1 className=' font-bold text-4xl italic px-2 py-1  w-fit headline '>NEWEST ARTWORKS</h1>
            </span>
            <div className='grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:3 lg:grid-cols-4 gap-5'>
                {
                    newestArts.map((art, index) => {
                        return <Link key={index} href={`/artworks/details?id=${art?.id}`}>
                            <Card isFooterBlurred className="card w-full h-[300px] bg-slate-300 shadow-lg shadow-slate-700 rounded-xl border-8">
                                <CardHeader className="absolute z-10 top-1 flex-col items-start">

                                    <h4 className="hide text-white/90 font-medium text-xl">{art.title.toUpperCase()}</h4>
                                </CardHeader>
                                <Image
                                    removeWrapper
                                    alt="Image"
                                    className="z-0 w-full h-full object-cover img"
                                    src={`${art.img}`}
                                />
                                <CardFooter className=" hide absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 ">
                                    <div className="flex flex-grow gap-2 items-center">
                                        <Image
                                            alt="Breathing app icon"
                                            className="rounded-full w-12 h-12 bg-black"
                                            src={`${art.users.img}`}
                                        />
                                        <p className="text-tiny text-white">{art.users.firstName + " " + art.users.lastName}</p>

                                    </div>
                                    <p className='text-white'>{art.price + "TK"}</p>
                                </CardFooter>
                            </Card>
                        </Link>
                    })
                }
            </div>
        </section>
    )
}

export default Newest
