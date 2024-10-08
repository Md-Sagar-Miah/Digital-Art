import PlainLayout from '@/components/master/PlainLayout';
import React from 'react';
import { Card, CardHeader, CardFooter, Image } from "@nextui-org/react";
import Link from 'next/link';

const getArtWorks = async (keyword) => {
    const data = await ((await fetch(`${process.env.BASE_URL}/api/artworks/arts/search?keyword=${keyword}`, { cache: 'no-store' })).json());
    return data['data'];
}

const page = async (props) => {
    const keyword = props.searchParams?.keyword;
    const artworks = await getArtWorks(keyword)
    return (
        <PlainLayout>
            <h1 className=' font-bold text-2xl mx-1 sm:mx-4 md:mx-8 lg:mx-20 mt-3 pb-1 text-red-500 border-b-4 border-red-200 w-fit'>Showing search results for {`"${keyword}"`} keyword:</h1>
            {artworks.length == 0 ? <h1 className=' text-2xl w-full m-auto text-center'>No such data is found !</h1> : <></>}
            <section className='grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:3 lg:grid-cols-4 gap-5 px-1 sm:px-4 md:px-8 lg:px-20 py-8'>
                {
                    artworks.map((art, index) => {
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
                                    <p className='text-white'>{art.price == 0 ? "Free" : `${art.price} Tk`}</p>
                                </CardFooter>
                            </Card>
                        </Link>
                    })
                }
            </section>
        </PlainLayout>
    )
}

export default page
