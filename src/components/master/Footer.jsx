import Link from 'next/link';
import React from 'react'

const Footer = () => {
    return (
        <footer className=" bg-gray-900 ">
            <div>
                <div className='mt-8 py-8'>
                    <div className='flex space-x-5  justify-center	'>
                        <Link className=' w-12 h-12 hover:border-2 hover:rounded-xl hover:border-white ' href={`/`}><img src="/facebook.png" alt="facebook" /></Link>
                        <Link className=' w-12 h-12 hover:border-2 hover:rounded-xl hover:border-white ' href={`/`}><img src="/youtube.png" alt="youtube" /></Link>
                        <Link className=' w-12 h-12 hover:border-2 hover:rounded-xl hover:border-white ' href={`/`}><img src="/twitter.png" alt="twitter" /></Link>
                        <Link className=' w-12 h-12 hover:border-2 hover:rounded-xl hover:border-white ' href={`/`}><img src="/linkedin.png" alt="linkedin" /></Link>
                    </div>
                    <div className=' text-white space-x-8 mt-4 text-center '>
                        <Link className='hover:text-red-600 font-semibold text-xl' href={`/`}>Home</Link>
                        <Link className='hover:text-red-600 font-semibold text-xl' href={`/`}>Gallery</Link>
                        <Link className='hover:text-red-600 font-semibold text-xl' href={`/`}>Contact Us</Link>
                        <Link className='hover:text-red-600 font-semibold text-xl' href={`/about`}>About Us</Link>

                    </div>
                </div>
                <div className=' bg-black text-center text-white py-4'>
                    <p>Copyright &copy; : Developed by SAGAR</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
