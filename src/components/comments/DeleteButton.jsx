"use client"
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

const DeleteButton = ({ id, userId, artId }) => {
    const router = useRouter();
    const handleCommentDelete = async () => {
        const res = await fetch("/api/artworks/comments/delete", {
            method: "POST",
            body: JSON.stringify({
                id: id,
                userId: userId,
                artId: artId
            }),

        })
        if (res.ok) {
            toast.success("Comment Delete Successful!")
            router.refresh()
        } else {
            toast.error("Something Wrong!")
        }
    }
    return (
        <Button className='bg-red-400 rounded-xl font-semibold' onClick={handleCommentDelete}>Delete</Button>
    )
}

export default DeleteButton
