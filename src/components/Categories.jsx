import { Category } from '@/utility/Categories'
import Link from 'next/link'
import React from 'react'

const Categories = () => {
    return (
        <section className='flex flex-wrap mx-1 sm:mx-4 md:mx-8 lg:mx-20 mt-6 text-center justify-center'>
            {
                Category.map((item, index,) => {
                    return <Link href={`/artworks/find?category=${item}`} key={index}>
                        <h3 className='border border-red-300 w-44 m-1 mx-2 p-2 bg-red-100 hover:bg-red-200'>{item}</h3>
                    </Link>
                })
            }
        </section>
    )
}

export default Categories
