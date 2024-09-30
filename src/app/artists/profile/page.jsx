import PlainLayout from '@/components/master/PlainLayout'
import WorkListOfArtist from '@/components/WorkListOfArtist';
import Image from 'next/image';
import React from 'react';

const getUserData = async (id) => {
    const data = await ((await fetch(`${process.env.BASE_URL}/api/user?id=${id}`)).json());
    return data['data'];
}

const page = async (props) => {
    const id = props.searchParams?.id;
    const user = await getUserData(id);
    const artworksLength = user.artworks.length

    return (
        <PlainLayout>
            <section className='mx-1 sm:mx-4 md:mx-8 lg:mx-20'>
                <div className=' grid sm:grid-flow-col sm:grid-cols-2 grid-flow-row items-center gap-2 bg-green-200 md:rounded-full p-4 my-2'>
                    <Image className=' h-fit w-fit m-auto md:rounded-full' src={user.img} priority={true} sizes="(max-width: 768px) 100vw, 33vw" height={10} width={10} />
                    <div>
                        <h2 className=' text-pretty font-bold text-red-500 text-3xl mt-2'>{user.firstName + " " + user.lastName}</h2>
                        <h5 className='text-red-500 font-semibold md:text-lg my-2'>{user.email}</h5>
                        <h5 className='text-red-400 font-semibold md:text-lg mb-2'>{user.mobile}</h5>
                        <h5 className='font-semibold md:text-lg mb-2'>About Me: <Image className='ms-2 mt-2 animate-bounce' src={"/down-arrow.png"} height={30} width={30} alt='arrow' /></h5>
                        <p className='text-red-400 mb-2 border border-red-200 p-2 md:w-3/4 text-pretty text-justify bg-red-50'>{user.bio}</p>

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
