import PlainLayout from '@/components/master/PlainLayout'
import React from 'react'
import { Card, CardHeader, CardFooter, Image } from "@nextui-org/react";
import Link from 'next/link';

const getPurchasedArts = async (userId) => {
    const res = await ((await fetch(`${process.env.BASE_URL}/api/artworks/purchased?userId=${userId}`, { cache: "no-cache" })).json())
    return res["data"]
}

const page = async ({ searchParams }) => {
    const params = searchParams
    const userId = params.userId
    const data = await getPurchasedArts(userId)
    const artworksLength = data.length
    return (
        <PlainLayout>
            <div className=''>
                <h1 className=' text-4xl text-red-500 font-bold italic border-b-4 border-black w-fit p-2 m-auto my-4 flex'>MY COLLECTIONS <Image className='ms-2 mt-2 animate-bounce' src={"/down-arrow.png"} height={30} width={30} alt='arrow' /></h1>
                {artworksLength ? <section className='grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-1 sm:px-4 md:px-8 lg:px-20 py-8'>
                    {
                        data.map((item, index) => {
                            return <Link className='' key={index} href={`/artworks/details?id=${item.artworks?.id}`}>
                                <Card isFooterBlurred className="card w-full h-[300px] bg-slate-300 shadow-lg shadow-slate-700 rounded-xl border-8">
                                    <CardHeader className="absolute z-10 top-1 flex-col items-start">

                                        <h4 className="hide text-white/90 font-medium text-xl">{item.artworks.title.toUpperCase()}</h4>
                                    </CardHeader>
                                    <Image
                                        removeWrapper
                                        alt="Image"
                                        className="z-0 w-full h-full object-cover img"
                                        src={`${item.artworks.img}`}
                                    />
                                    <CardFooter className=" hide absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 ">
                                        <div className="flex flex-grow gap-2 items-center">
                                            <Image
                                                alt="Breathing app icon"
                                                className="rounded-full w-12 h-12 bg-black"
                                                src={`${item.artworks.users.img}`}
                                            />
                                            <p className="text-tiny text-white">{item.artworks.users.firstName + " " + item.artworks.users.lastName}</p>

                                        </div>
                                        {/* <a href={item.artworks.img} download={`${item.artworks.title}`}><Image className='bg-white rounded-full border border-white h-12 w-12' src={"/downloading.png"} height={10} width={10} alt='img' /></a> */}
                                    </CardFooter>
                                </Card>
                            </Link>
                        })
                    }
                </section> : <h2 className='h-64 text-center text-slate-400 text-4xl'>No Purchased Artworks Found !</h2>}
            </div>
        </PlainLayout>
    )
}

export default page
