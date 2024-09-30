"use client"
import React, { useState } from 'react'
import { Textarea, Button } from "@nextui-org/react";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const CommentBox = ({ id }) => {
    const [commentData, setCommentData] = useState("");
    const router = useRouter()
    const handleCommentData = (event) => {
        setCommentData(event.target.value);
    }
    const handleComment = async () => {
        if (commentData != "") {
            const res = await fetch("/api/artworks/comments/create", {
                method: "POST",
                body: JSON.stringify({
                    descriptions: commentData,
                    artId: id
                }),

            })
            if (!res.ok) {
                router.push("/login")
            } else {
                toast.success("Your comment is successful!")
                router.refresh()
                setCommentData("");
            }
            console.log(res)
        } else {
            toast.error("Please type your comment !")
        }
    }
    return (
        <section className='flex'>
            <Textarea
                label="COMMENT BOX"
                variant="bordered"
                placeholder="Enter your comments"
                disableAnimation
                disableAutosize
                value={commentData}
                className=' bg-red-200 sm:max-w-96 rounded-xl'
                onChange={handleCommentData}

            />
            <Button className=" w-fit py-2 bg-green-300 hover:bg-green-400 font-semibold text-red-500 mt-14 ms-1 rounded-xl" onClick={handleComment}>COMMENT</Button>
        </section>
    )
}

export default CommentBox
