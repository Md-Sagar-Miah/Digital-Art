"use client"
import React, { useState } from 'react';
import PlainLayout from '@/components/master/PlainLayout';
import { Input } from "@nextui-org/input";
import { EyeFilledIcon } from '@/components/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@/components/EyeSlashFilledIcon';
import Image from 'next/image';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';



const page = () => {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  const handleValue = (event) => {
    setLoginData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    const result = await fetch("/api/user/login", {
      // Adding method type 
      method: "POST",

      // Adding body or contents to send 
      body: JSON.stringify(loginData),

      // Adding headers to the request 
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "Failed") {
          toast.error(json.message + " !")
        } else {
          localStorage.setItem("logedIn", "true");
          router.push("/user/profile")
          toast.success("Login Successful.");
          router.refresh()
        }
      })
      .catch((error) => toast.error("Somthing Wrong !"))

  }
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <PlainLayout>
      <div className=" w-fit md:w-96 m-auto bg-custom px-8 pt-4 pb-6 rounded-xl my-5 shadow-2xl shadow-black border-x-8 border-x-red-500">
        <h2 className="text-2xl font-bold m-auto w-fit mb-6 text-red-500">Get Into Your Account</h2>
        <form onSubmit={handleLogin}>
          <div >
            <label className="p-2 me-2 font-semibold" htmlFor="email">Email</label>
            <Input className="shadow-2xl shadow-black mb-4 border-b border-black hover:border-red-500 hover:duration-1000" type="email" name="email" id='email' placeholder='Enter your email'
              variant={"underlined"}
              onChange={handleValue}
              startContent={
                <Image src={"/user.png"} height={15} width={15} alt="user" />
              }
            />
          </div>
          <div>
            <label className="p-2 me-2 font-semibold" htmlFor="password">Password</label>
            <Input
              placeholder="Enter your password"
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
              name="password"
              id="password"
              variant={"underlined"}
              startContent={
                <Image src={"/padlock.png"} height={18} width={18} alt="lock" />
              }
            />
          </div>
          <Button className=" w-full py-2 rounded-md m-auto block bg-red-600 hover:bg-red-500 font-semibold text-white" type="submit">Login</Button>
          <p className="mt-4 font-medium">Don't have an account? <Link className=" text-red-600 hover:text-red-500" href={"/register"} >Sign Up</Link> </p>
        </form>
      </div>
    </PlainLayout>
  );
}

export default page
