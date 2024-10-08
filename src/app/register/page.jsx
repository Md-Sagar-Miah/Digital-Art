"use client"
import PlainLayout from '@/components/master/PlainLayout'
import React, { useState } from 'react'
import { Input, Button, Textarea } from "@nextui-org/react";
import { EyeFilledIcon } from '@/components/EyeFilledIcon';
import { EyeSlashFilledIcon } from '@/components/EyeSlashFilledIcon';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState(null)
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    mobile: "",
    password: "",
    password2: ""
  })
  const handleValidation = () => {
    if (image === null) {
      toast.error("Upload your profile picture !")
    } else if (userData.firstName === "") {
      toast.error("Please,Enter your First Name !")
    } else if (userData.lastName === "") {
      toast.error("Please,Enter your Last Name !")
    } else if (userData.email === "") {
      toast.error("Please,Enter your Email !")
    } else if (userData.mobile === "") {
      toast.error("Enter you Mobile Number !");
    } else if (userData.password.length < 6) {
      toast.error("Password length must be atleast 6 characters! ");
    } else if (userData.password !== userData.password2) {
      toast.error("Passwords did not match !")
    } else {
      return true
    }
  }
  const handleRegistration = async (event) => {
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

      if (upload.status === "Success") {
        const res = await fetch("/api/user/registration", {
          method: "POST",
          body: JSON.stringify({ firstName: userData.firstName, lastName: userData.lastName, email: userData.email, bio: userData.bio, mobile: userData.mobile, password: userData.password, img: upload.path }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        if (res.ok) {
          setUserData({
            firstName: "",
            lastName: "",
            email: "",
            bio: "",
            mobile: "",
            password: "",
            password2: ""
          })
          router.push("/login")
          toast.success("Resistration Successful.")
        } else {
          const result = await fetch("/api/upload/delete", {
            // Adding method type 
            method: "POST",

            // Adding body or contents to send 
            body: JSON.stringify({ path: upload.path }),

            // Adding headers to the request 
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          toast.error("Email already used !")
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
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <PlainLayout>
      <div className=" w-fit md:w-3/4 lg:w-1/2 m-auto bg-custom border-x-8 border-x-red-500  px-8 pt-4 pb-6 rounded-xl my-10 shadow-2xl shadow-black">
        <form onSubmit={handleRegistration}>

          <h2 className="text-2xl font-bold m-auto w-fit mb-6 text-red-500">Registration Form</h2>
          <div className='w-fit m-auto mb-8'>
            {image ? <Image className='mb-4 border rounded-full w-20 h-20' src={URL.createObjectURL(image)} width={80} height={80} alt='profile' /> : <Image className='mb-4 border rounded-full' src="/profile.png" width={80} height={80} alt='profile' />}
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
          <div>
            <label className="p-2 me-2 font-semibold" htmlFor="password"><span className=' text-red-600'>*</span>Password:</label>
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

              className="shadow-2xl shadow-black mb-4 border-b border-black hover:border-red-500 hover:duration-1000"
              name="password"
              id="password"
              value={userData.password}
              variant={"underlined"}
            />
          </div>
          <div>
            <label className="p-2 me-2 font-semibold" htmlFor="password2"><span className=' text-red-600'>*</span>Confirm Password:</label>
            <Input
              placeholder="Retype your password"
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
              name="password2"
              id="password2"
              value={userData.password2}
              variant={"underlined"}
            />
          </div>
          <Button className=" w-full py-2 rounded-md m-auto block bg-red-600 hover:bg-red-500 font-semibold text-white" type="submit">Create Account</Button>


        </form>
        <p className="mt-4 font-medium">Already have an account? <Link className=" text-red-600 hover:text-red-500" href={"/login"} >Sign In</Link> </p>
      </div>

    </PlainLayout >
  )
}

export default page
