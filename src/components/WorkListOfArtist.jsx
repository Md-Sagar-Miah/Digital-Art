import React from 'react'
import { Card, CardHeader, CardFooter, Image } from "@nextui-org/react";
import Link from 'next/link';

const WorkListOfArtist = ({ artist }) => {
    return (
        <section className='grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
            {
                artist.artworks.map((art, index) => {
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
                                        src={`${artist.img}`}
                                    />
                                    <p className="text-tiny text-white">{artist.firstName + " " + artist.lastName}</p>

                                </div>
                                <p className='text-white'>{art.price == 0 ? "Free" : `${art.price} Tk`}</p>
                            </CardFooter>
                        </Card>
                    </Link>
                })
            }
        </section>
    )
}

export default WorkListOfArtist;
