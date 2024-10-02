
import PlainLayout from '@/components/master/PlainLayout'
import { cookies } from 'next/headers'
import { PrismaClient } from "@prisma/client";
const { VerifyToken } = require("@/utility/JWTTokenHelper");
import React from 'react'
import toast from 'react-hot-toast';
import { redirect } from 'next/dist/server/api-utils';
import { Card, CardBody, Image, CardFooter } from "@nextui-org/react";
import Link from 'next/link';
import WorkListOfArtist from '@/components/WorkListOfArtist';

const getProfileInfo = async (id) => {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('token');
        const data = await VerifyToken(token.value);
        const prisma = new PrismaClient()
        const user = await prisma.users.findUnique({ where: { id: data.id }, include: { artworks: true } })
        return user
    } catch (error) {
        redirect("/login")
        toast.error("Authentication Error!")
    }
}

const page = async () => {
    const user = await getProfileInfo()
    const artworksLength = user.artworks.length
    return (
        <PlainLayout>
            <section className='px-1 sm:px-4 md:px-8 lg:px-20'>
                <div className=' grid grid-flow-row md:grid-cols-2 py-4 gap-6'>
                    <Card className="py-4 bg-pink-300 w-full h-fit rounded-lg shadow-slate-400 shadow-lg">

                        <div className=' grid lg:grid-flow-row lg:grid-cols-2 m-auto  '>
                            <CardBody className="overflow-visible mx-auto w-fit py-2">
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl"
                                    src={user.img}
                                    width={270}
                                />
                                <small className='text-slate-400 mt-2 ms-1'>{`Since: ${user.createdAt.toString().slice(0, 16)}`}</small>
                            </CardBody>
                            <CardFooter className="pb-0 mb-0 pt-2 px-4 flex-col">
                                <h4 className="font-bold uppercase text-2xl">{`${user.firstName} ${user.lastName}`}</h4>
                                <p className="text-tiny font-semibold">{"Email: " + user.email}</p>
                                <p className="text-tiny font-semibold">{"Mobile: " + user.mobile}</p>
                                <p className='mt-3 font-semibold text-tiny'>About:</p>
                                <small className="text-default-500 text-justify text-black font-serif ">{user.bio} </small>

                            </CardFooter>
                        </div>


                    </Card>
                    <div className=' grid grid-flow-row sm:grid-flow-col sm:grid-col-2 sm:grid-rows-2 gap-6 '>
                        <Link href={"/user/artwork/post"}><div className='bg-yellow-300 w-full h-20 sm:h-full text-center content-center text-2xl font-serif font-bold rounded-lg shadow-slate-400 shadow-lg hover:scale-95 sm:hover:scale-110 transition-all ease-in-out duration-500 p-2' >Upload Post</div></Link>
                        <Link href={"/user/profile/update"}><div className='bg-green-300 w-full h-20 sm:h-full text-center content-center text-2xl font-serif font-bold rounded-lg shadow-slate-400 shadow-lg hover:scale-95 sm:hover:scale-110 transition-all ease-in-out duration-500 p-2'>Update Profile</div></Link>
                        <Link href={"/user/profile/password"}><div className=' bg-lime-300 w-full h-20 sm:h-full text-center content-center text-2xl font-serif font-bold rounded-lg shadow-slate-400 shadow-lg hover:scale-95 sm:hover:scale-110 transition-all ease-in-out duration-500 p-2'><span className='sm:block'>Change </span>Password</div></Link>
                        <Link href={`/user/profile/purchased/artworks?userId=${user.id}`}><div className='bg-red-300 w-full h-20 sm:h-full text-center content-center text-2xl font-serif font-bold rounded-lg shadow-slate-400 shadow-lg hover:scale-95 sm:hover:scale-110 transition-all ease-in-out duration-500 p-2'><span className='sm:block'>Purchased </span>Artworks</div></Link>
                    </div>
                </div>
                <div className='my-8'>
                    <h1 className=' text-4xl text-red-500 font-bold italic border-b-4 border-black w-fit p-2 m-auto my-4 flex'>MY WORKS <Image className='ms-2 mt-2 animate-bounce' src={"/down-arrow.png"} height={30} width={30} alt='arrow' /></h1>
                    {artworksLength ? <WorkListOfArtist artist={user} /> : <h2 className=' text-center text-slate-400 text-4xl'>No Shared Artworks Found !</h2>}
                </div>
            </section>
        </PlainLayout>
    )
}

export default page
