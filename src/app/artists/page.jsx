import React from 'react'
import PlainLayout from '@/components/master/PlainLayout'
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import Link from 'next/link';

const getUsers = async () => {
  const users = await ((await fetch("http://localhost:3000/api/user/all", { cache: 'no-store' })).json());
  return users["data"]
}

const route = async () => {
  const users = await getUsers()
  return (
    <PlainLayout>
      <section className='grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:3 lg:grid-cols-4 gap-5 px-1 sm:px-4 md:px-8 lg:px-20 py-8'>
        {users.map((user, index) => {
          return <Link key={index} href={`/artists/profile?id=${user.id}`}>
            <Card
              className='rounded-xl bg-gray-300 h-48 hover:scale-90 sm:hover:scale-110 transition-all ease-in-out duration-500 shadow-lg shadow-slate-600'
              isFooterBlurred
              radius="lg"
            >
              <Image
                alt="Woman listing to music"
                className="object-cover "
                src={user.img}
              />
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">{user.firstName + " " + user.lastName}</p>
                <Button className="text-tiny text-white bg-black/20 hover:bg-black hover:bg-opacity-50 transition-all ease-in-out duration-500" variant="flat" color="default" radius="lg" size="sm">
                  Details...
                </Button>
              </CardFooter>
            </Card>
          </Link>
        })}
      </section>
    </PlainLayout>
  )
}

export default route
