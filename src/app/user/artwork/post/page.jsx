"use client"
import React, { useState } from 'react'
import PlainLayout from '@/components/master/PlainLayout'
import toast from 'react-hot-toast';
import { Image, Input, Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import { Category } from '@/utility/Categories';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter();
    const [image, setImage] = useState(null);
    const [postData, setPostData] = useState({
        title: "",
        des: "",
        price: "0",
        category: "",
    })
    const handleValidation = () => {
        if (postData.title === "") {
            toast.error("Title can not be Empty !")
        } else if (postData.category === "") {
            toast.error("Please Select Category !")
        } else if (image === null) {
            toast.error("Upload your Artwork !")
        } else {
            return true
        }
    }
    const handleImage = (event) => {
        setImage(event.target.files[0]);
    }
    const handleArtworkPost = async (event) => {
        event.preventDefault();
        const ok = handleValidation()
        if (ok) {
            const img = new FormData();
            img.append("img", image);
            const upload = await fetch("/api/upload", {
                method: "POST",
                body: img
            }).then((res) => {
                return res.json()
            }).then((json) => {
                return json
            })
                .catch((err) => {
                    toast.error(err.toString());
                })

            if (upload.status = "Success") {
                const res = await fetch("/api/artworks/art", {
                    method: "POST",
                    body: JSON.stringify({ title: postData.title, des: postData.des, price: parseFloat(postData.price), category: postData.category, img: upload.path }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })

                if (res.ok) {
                    setPostData({
                        title: "",
                        des: "",
                        price: "",
                        img: "",
                        category: ""
                    })
                    router.push("/user/profile")
                    toast.success("Post is created successfuly.")
                    router.refresh()
                } else {
                    const result = await fetch("/api/upload/delete", {
                        method: "POST",
                        body: JSON.stringify({ path: upload.path }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                    toast.error("Somthing Wrong !")
                }
            }

        }

    }
    const handleValue = (event) => {
        setPostData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    }
    return (
        <PlainLayout>
            <div className="px-1 sm:px-4 md:px-8 lg:px-20 py-4">
                <form className='p-6' onSubmit={handleArtworkPost}>
                    <div className='grid sm:grid-flow-col sm:grid-cols-2'>
                        <div className='w-full m-auto mb-8'>
                            {image ? <Image isBlurred className='mb-4 h-1/ w-1/2 sm:h-4/5 sm:w-4/5 p-4 m-auto' src={URL.createObjectURL(image)} width={800} height={800} alt='profile' /> : <Image isBlurred className='mb-4 h-1/ w-1/2 sm:h-4/5 sm:w-4/5 p-4 m-auto' src="/photo.png" width={800} height={800} alt='profile' />}
                            <label htmlFor="file" className=' bg-green-300 px-2 py-1 rounded font-semibold w-fit block m-auto'>Upload</label>
                            <input type="file" name='file' id='file' onChange={handleImage} hidden />
                        </div>
                        <div>
                            <div >
                                <label className="p-2 me-2 font-semibold" htmlFor="title"><span className=' text-red-600'>*</span>Title:</label>
                                <Input className="shadow-2xl shadow-black mb-4 border-b border-black hover:border-red-500 hover:duration-1000" type="text" name="title" id='title' placeholder='Enter titile here'
                                    variant={"underlined"}
                                    value={postData.title}
                                    onChange={handleValue}
                                />
                            </div>

                            <div className=''>
                                <div >
                                    <label className="p-2 me-2 font-semibold" htmlFor="price">Price[tk]:</label>
                                    <Input className="shadow-2xl shadow-black mb-4 border-b border-black hover:border-red-500 hover:duration-1000" type="number" id="price"
                                        name="price" step="0.01" placeholder='0.00'
                                        value={postData.price}
                                        variant={"underlined"}
                                        onChange={handleValue}
                                    />
                                </div>
                                <div >
                                    <label className="p-2 me-2 font-semibold" htmlFor='category'><span className=' text-red-600'>*</span>Category:</label>
                                    <Select aria-label='close' className="shadow-2xl shadow-black mb-4 border-b border-black hover:border-red-500 hover:duration-1000" id="category"
                                        name="category" placeholder='Select Category'
                                        variant={"underlined"}
                                        onChange={handleValue}
                                    >
                                        {Category.map((item) => (
                                            <SelectItem className=' bg-red-100 hover:bg-red-300' key={item}>
                                                {item}

                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div >
                                <label className="p-2 me-2 font-semibold" htmlFor="des">Description:</label>
                                <Textarea
                                    className="shadow-2xl shadow-black/50 mb-4 border-b border-black hover:border-red-500 hover:duration-1000"
                                    placeholder="Enter description"
                                    name="des" id='des'
                                    value={postData.des}
                                    onChange={handleValue}
                                />
                            </div>

                        </div>
                    </div>
                    <Button className=" w-full py-2 rounded-md m-auto block bg-red-600 hover:bg-red-500 font-semibold text-white" type="submit">Create Post</Button>
                </form>

            </div>
        </PlainLayout>
    )
}

export default page

