"use client"
import PlainLayout from '@/components/master/PlainLayout'
import React, { useEffect, useState } from 'react'
import { Input, Button, Textarea } from "@nextui-org/react";
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter()
    const [image, setImage] = useState(null)
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        img: "",
        email: "",
        bio: "",
        mobile: "",
    })
    const handleValidation = () => {
        if (userData.img === "") {
            toast.error("Upload your profile picture !")
        } else if (userData.firstName === "") {
            toast.error("Please,Enter your First Name !")
        } else if (userData.lastName === "") {
            toast.error("Please,Enter your Last Name !")
        } else if (userData.email === "") {
            toast.error("Please,Enter your Email !")
        } else if (userData.mobile === "") {
            toast.error("Enter you Mobile Number !");
        } else {
            return true
        }
    }
    const handleUpdate = async (event) => {
        event.preventDefault()
        const ok = handleValidation();
        if (ok) {
            if (image != null) {
                const img = new FormData();
                img.append("img", image);
                const upload = await fetch("/api/upload", {
                    method: "POST",
                    body: img
                }).then((res) => {
                    return res.json()
                }).then((json) => {
                    return json
                }).catch((error) => {
                    toast.error("Something wrong to upload profile picture!")
                })

                if (upload.status === "Success") {
                    const res = await fetch("/api/user/profile", {
                        method: "PATCH",
                        body: JSON.stringify({ firstName: userData.firstName, lastName: userData.lastName, email: userData.email, bio: userData.bio, mobile: userData.mobile, img: upload.path }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                    if (res.ok) {
                        const result = await fetch("/api/upload/delete", {
                            method: "POST",
                            body: JSON.stringify({ path: userData.img }),
                            headers: {
                                "Content-type": "application/json; charset=UTF-8"
                            }
                        })
                        router.push("/user/profile")
                        toast.success("Pofile Update Successful.")
                    } else {
                        const result = await fetch("/api/upload/delete", {
                            method: "POST",
                            body: JSON.stringify({ path: upload.path }),
                            headers: {
                                "Content-type": "application/json; charset=UTF-8"
                            }
                        })
                        toast.error("Email already used !")
                    }
                }
            } else {
                const res = await fetch("/api/user/profile", {
                    method: "PATCH",
                    body: JSON.stringify(userData),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })

                if (res.ok) {
                    router.push("/user/profile");
                    toast.success("Pofile Update Successful.")
                }

            }


        }
    }

    const handleValue = (event) => {
        setUserData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    }
    const handleImage = (event) => {
        setImage(event.target.files[0]);
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = (await (await fetch("/api/user/profile"))?.json())["user"]
                setUserData({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    img: user.img,
                    email: user.email,
                    bio: user.bio,
                    mobile: user.mobile,

                });
            } catch (error) {
                router.push("/login")

            }
        }
        getUser();
    }, [])
    return (
        <PlainLayout>
            <div className=" w-fit md:w-3/4 lg:w-1/2 m-auto bg-green-50 border-x-8 border-x-red-500  px-8 pt-4 pb-6 rounded-xl my-10 shadow-2xl shadow-black">
                <form onSubmit={handleUpdate}>

                    <h2 className="text-2xl font-bold m-auto w-fit mb-6 text-red-500">Update your profile</h2>
                    <div className='w-fit m-auto mb-8'>
                        {image ? <Image className='mb-4 border rounded-full w-20 h-20' src={URL.createObjectURL(image)} width={80} height={80} alt='profile' /> : <Image className='mb-4 border rounded-full w-20 h-20' src={`${userData.img}`} width={80} height={80} alt='profile' />}
                        <label htmlFor="file" className=' bg-orange-500 px-2 py-1 rounded font-semibold w-20 ms-2'>Upload</label>
                        <input type="file" name='file' id='file' onChange={handleImage} hidden />
                    </div>
                    <div className=' grid grid-flow-col justify-between w-full grid-cols-2 gap-2 md:gap-4'>
                        <div >
                            <label className="p-2 me-2 font-semibold" htmlFor="firstName"><span className=' text-red-600'>*</span>First Name:</label>
                            <Input className="shadow-2xl shadow-black mb-4 border-b border-black hover:border-red-500 hover:duration-1000" type="text" name="firstName" id='FirstName' value={userData.firstName} placeholder='Enter your first name'
                                variant={"underlined"}
                                onChange={handleValue}
                            />
                        </div>
                        <div >
                            <label className="p-2 me-2 font-semibold" htmlFor="lastName"><span className=' text-red-600'>*</span>Last Name:</label>
                            <Input className="shadow-2xl shadow-black mb-4 border-b border-black hover:border-red-500 hover:duration-1000" type="text" name="lastName" id='LastName' value={userData.lastName} placeholder='Enter your last name'
                                variant={"underlined"}
                                onChange={handleValue}

                            />
                        </div>
                    </div>
                    <div >
                        <label className="p-2 me-2 font-semibold" htmlFor="email"><span className=' text-red-600'>*</span>Email:</label>
                        <Input className="shadow-2xl shadow-black mb-4 border-b border-black hover:border-red-500 hover:duration-1000" type="email" name="email" id='email' value={userData.email} placeholder='Enter your email'
                            variant={"underlined"}
                            onChange={handleValue}
                        />
                    </div>
                    <div >
                        <label className="p-2 me-2 font-semibold" htmlFor="mobile"><span className=' text-red-600'>*</span>Mobile:</label>
                        <Input className="shadow-2xl shadow-black mb-4 border-b border-black hover:border-red-500 hover:duration-1000" type="text" name="mobile" id='mobile' value={userData.mobile} placeholder='Enter your email'
                            variant={"underlined"}
                            onChange={handleValue}
                        />
                    </div>
                    <div >
                        <label className="p-2 me-2 font-semibold" htmlFor="bio">Bio:</label>
                        <Textarea
                            className="shadow-2xl shadow-black/50 mb-4 border-b border-black hover:border-red-500 hover:duration-1000"
                            placeholder="Enter your description"
                            name="bio" id='bio' value={userData.bio}
                            onChange={handleValue}
                        />
                    </div>
                    <Button className=" w-full py-2 rounded-md m-auto block bg-red-600 hover:bg-red-500 font-semibold text-white" type="submit">Update Profile</Button>


                </form>
            </div>
        </PlainLayout>
    )
}

export default page
