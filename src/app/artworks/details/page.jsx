import PlainLayout from '@/components/master/PlainLayout';
import Newest from '@/components/Newest';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import CommentBox from '@/components/comments/CommentBox';
import CommentsDetails from '@/components/comments/CommentsDetails';
import CheckoutButton from '@/components/CheckoutButton';
const getArtWorkDetails = async (id) => {
    const result = await ((await fetch(`${process.env.BASE_URL}/api/artworks/art/details?id=${id}`)).json())
    return result["data"];
}
const page = async (props) => {
    const id = props.searchParams?.id;
    const artwork = await getArtWorkDetails(id);
    return (
        <PlainLayout>
            <section className='mx-1 sm:mx-4 md:mx-8 lg:mx-20 my-8 py-6 px-2 shadow-black shadow-2xl rounded-sm'>
                <div className=' grid sm:grid-flow-col sm:grid-cols-8'>
                    <div className=' sm:col-span-6 p-2'>
                        <h1 className=' text-red-500 text-4xl font-bold mb-1'>{artwork?.title.toUpperCase()}</h1>
                        <h6 className=' text-xl text-slate-400 mb-2'>{artwork?.category}</h6>
                        <Image className=' h-fit w-full' src={artwork?.img} priority={true} sizes="(max-width: 768px) 100vw, 33vw" height={10} width={10} alt='Image' />
                        <small className='text-slate-400 mt-2 ms-1'>{`Created At: ${artwork.createdAt.toString().slice(0, 16)}`}</small>
                        <p>{artwork.des}</p>
                        <h3 className=' text-red-500 text-2xl font-semibold mb-1'>{artwork.price == 0 ? "Free" : `${artwork.price} Tk`}</h3>
                        {artwork.price == 0 ? <a href={artwork.img} className=" w-full py-1 text-2xl rounded-md m-auto text-center block bg-red-500 hover:bg-red-600 font-semibold text-white" download={`${artwork.title}`}><span className=' animate-pulse'>GET</span></a> : <CheckoutButton artId={artwork.id} title={artwork.title} category={artwork.category} totalAmount={artwork.price} />}
                    </div>
                    <div className=' sm:col-span-2 px-3 mt-4 sm:mt-20'>
                        <h1 className=' text-2xl font-bold mb-4 flex'>SHARED BY <Image className='ms-2 mt-2 animate-bounce' src={"/down-arrow.png"} height={30} width={30} alt='arrow' /></h1>
                        <Image className=' h-fit w-full rounded-full' src={artwork.users.img} priority={true} sizes="(max-width: 768px) 100vw, 33vw" height={10} width={10} alt='Image' />
                        <h2 className=' text-pretty font-semibold text-red-500 text-xl mt-2'>{artwork.users.firstName + " " + artwork.users.lastName}</h2>
                        <h5 className='text-red-300 mb-2'>{artwork.users.email}</h5>
                        <Link href={`/artists/profile?id=${artwork.users.id}`} className=" w-full py-2 rounded-md m-auto text-center block bg-blue-400 hover:bg-blue-500 font-semibold text-lg text-white" >View Profile</Link>
                    </div>
                </div>

                <div className='p-2'>
                    <CommentBox id={artwork.id} />
                </div>
                <div>
                    <CommentsDetails artId={artwork.id} />
                </div>
            </section>
            <Newest />
        </PlainLayout>

    )
}

export default page
