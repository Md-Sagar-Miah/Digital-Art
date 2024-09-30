import React from 'react'
import { Button, User } from "@nextui-org/react";
import { cookies } from 'next/headers'
import DeleteButton from './DeleteButton';
const { VerifyToken } = require("@/utility/JWTTokenHelper");

const getComments = async (artId) => {
    const result = await ((await fetch(`${process.env.BASE_URL}/api/artworks/comments/all/?artId=${artId}`, { cache: 'no-store' })).json())
    return result["data"];
}
const loginUser = async () => {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('token');
        const data = await VerifyToken(token.value);
        return data.id;
    } catch (error) {
        return null;
    }
}
const CommentsDetails = async ({ artId }) => {
    const comments = await getComments(artId)
    const userId = await loginUser();
    return (
        <section className='mb-3 mt-4'>
            {
                comments.map((item, index) => {
                    return <div key={index} className={index % 2 == 0 ? " bg-green-200 p-2 my-1" : " bg-red-200 p-2 my-1"}>
                        <div className='flex justify-between mb-2'>
                            <User className=' text-lg font-bold'
                                name={`${item.users.firstName} ${item.users.lastName}`}
                                avatarProps={{
                                    src: `${item.users.img}`
                                }}
                            />
                            <div>
                                {item.users.id == userId ? <DeleteButton id={item.id} userId={userId} artId={artId} /> : <></>}
                            </div>
                        </div>
                        <p className='ms-5 bg-white py-2 rounded-full px-4 font-semibold text-slate-700'>{item.descriptions}</p>
                    </div>
                })
            }
        </section>
    )
}

export default CommentsDetails
