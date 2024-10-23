"use client"
import PlainLayout from '@/components/master/PlainLayout'
import React, { useState } from 'react'
import { EyeFilledIcon } from '@/components/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@/components/EyeSlashFilledIcon';
import { Input, Button } from "@nextui-org/react";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter()
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [data, setData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })
    const handleValue = (event) => {
        setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));

    }
    const handlePasswordChange = async (event) => {
        event.preventDefault()
        if (data.newPassword === data.confirmNewPassword && data.newPassword.length >= 6) {
            const res = await fetch("/api/user/profile", {
                method: "PUT",
                body: JSON.stringify({ oldPassword: data.oldPassword, newPassword: data.newPassword })
            })
            if (res.ok) {
                toast.success("Password updated successfuly.")
                setData({
                    oldPassword: "",
                    newPassword: "",
                    confirmNewPassword: ""
                })
                router.push("/user/profile")
            } else {
                toast.error("Authentication error !");
            }
        } else if (data.newPassword.length < 6) {
            toast.error("Password length must be atleast 6 characters !")
        } else {
            toast.error("Type confirm password correctly !")
        }

    }
    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleVisibility2 = () => setIsVisible2(!isVisible2);
    return (
        <PlainLayout>
            <form onSubmit={handlePasswordChange} className=' w-11/12 m-auto sm:w-1/2 my-12 px-10 py-4 bg-green-50 shadow-2xl shadow-red-400 rounded-md border-x-8 border-x-red-500'>
                <div>
                    <label className="p-2 me-2 font-semibold" htmlFor="oldPassword"><span className=' text-red-600'>*</span>Old Password:</label>
                    <Input
                        placeholder="Type your old password"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        onChange={handleValue}

                        className="shadow-2xl shadow-black mb-8 border-b border-black hover:border-red-500 hover:duration-1000"
                        name="oldPassword"
                        id="oldPassword"
                        value={data.oldPassword}
                        variant={"underlined"}
                    />
                </div>
                <div>
                    <label className="p-2 me-2 font-semibold" htmlFor="newPassword"><span className=' text-red-600'>*</span>New Password:</label>
                    <Input
                        placeholder="Type your new password"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility2}>
                                {isVisible2 ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible2 ? "text" : "password"}
                        onChange={handleValue}

                        className="shadow-2xl shadow-black mb-8 border-b border-black hover:border-red-500 hover:duration-1000"
                        name="newPassword"
                        id="NewPassword"
                        value={data.newPassword}
                        variant={"underlined"}
                    />
                </div>
                <div>
                    <label className="p-2 me-2 font-semibold" htmlFor="confirmNewPassword"><span className=' text-red-600'>*</span>Confirm Password:</label>
                    <Input
                        placeholder="Retype your new password"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility2}>
                                {isVisible2 ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible2 ? "text" : "password"}
                        onChange={handleValue}

                        className="shadow-2xl shadow-black mb-8 border-b border-black hover:border-red-500 hover:duration-1000"
                        name="confirmNewPassword"
                        id="confirmNewPassword"
                        value={data.confirmNewPassword}
                        variant={"underlined"}
                    />
                </div>
                <Button className=' w-fit py-2 rounded-md m-auto block bg-red-600 hover:bg-red-500 font-semibold text-white' type='submit'>Change password</Button>
            </form>

        </PlainLayout>
    )
}

export default page
