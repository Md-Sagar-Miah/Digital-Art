"use client"
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { Input } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Avatar } from "@nextui-org/react";
import { Category } from '@/utility/Categories';
import toast from 'react-hot-toast';


const Navbar = () => {
    const router = useRouter()
    const current = usePathname();
    const [logedIn, setLogedIn] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        img: "",
        id: ""
    })


    const handleLogOut = async () => {
        const result = await fetch("/api/user/logout");
        if (result.ok) {
            localStorage.removeItem("logedIn");
            setLogedIn(false);
            router.push("/login")
            toast.success("Log out successful.")
            router.refresh()
        } else {
            toast.error("Somthing Wrong !")
        }
    }



    const NavClick = () => {
        // open
        const burger = document.querySelectorAll('.navbar-burger');
        const menu = document.querySelectorAll('.navbar-menu');

        if (burger.length && menu.length) {
            for (var i = 0; i < burger.length; i++) {
                burger[i].addEventListener('click', function () {
                    for (var j = 0; j < menu.length; j++) {
                        menu[j].classList.toggle('hidden');
                    }
                });
            }
        }

        // close
        const close = document.querySelectorAll('.navbar-close');
        const backdrop = document.querySelectorAll('.navbar-backdrop');

        if (close.length) {
            for (var i = 0; i < close.length; i++) {
                close[i].addEventListener('click', function () {
                    for (var j = 0; j < menu.length; j++) {
                        menu[j].classList.toggle('hidden');
                    }
                });
            }
        }

        if (backdrop.length) {
            for (var i = 0; i < backdrop.length; i++) {
                backdrop[i].addEventListener('click', function () {
                    for (var j = 0; j < menu.length; j++) {
                        menu[j].classList.toggle('hidden');
                    }
                });
            }
        }
    }

    useEffect(() => {
        const userLogedIn = localStorage.getItem("logedIn");
        if (userLogedIn) {
            setLogedIn(true);
            const getUser = async () => {
                try {
                    const user = (await (await fetch("/api/user/profile"))?.json())["user"]
                    setUserData({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        img: user.img,
                        id: user.id
                    });
                } catch (error) {
                    localStorage.removeItem("logedIn");
                    setLogedIn(false);
                    setUserData({
                        firstName: "",
                        lastName: "",
                        img: "",
                        id: ""
                    })

                }
            }
            getUser()

        }
    }, [logedIn])



    return (
        <div>
            <nav className='relative px-1 sm:px-4 md:px-8 lg:px-20 py-4 flex justify-between items-center bg-custom '>
                <Link className=' p-2 bg-red-500 rounded rounded-e-full' href="/"><span className=" rounded-full font-bold text-5xl text-white">D</span> <span className=" text-xl font-bold ">ART</span></Link>

                <div className='lg:hidden'>
                    <button onClick={() => { NavClick() }} className='navbar-burger flex items-center text-gray-600 p-3'>
                        <svg className='block h-4 w-4 fill-current' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                            <title>Mobile menu</title>
                            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
                        </svg>
                    </button>
                </div>
                <ul className='hidden lg:flex lg:items-center lg:w-auto lg:space-x-6 text-xl font-semibold'>
                    <li>
                        <Link className={current === "/" ? " text-xl text-red-600 " : "  hover:text-red-600 hover:bg-white px-1 py-1 hover:bg-opacity-20 rounded-sm hover:duration-500 "} href={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link className={current === "/artworks" ? " text-xl text-red-600" : " hover:text-red-600 hover:bg-white px-1 py-1 hover:bg-opacity-20 rounded-sm hover:duration-500 "} href={'/artworks'}>Artwoks</Link>
                    </li>
                    <li>
                        <Link className={current === "/artists" ? " text-xl text-red-600" : " hover:text-red-600 hover:bg-white px-1 py-1 hover:bg-opacity-20 rounded-sm hover:duration-500 "} href={'/artists'}>Artists</Link>
                    </li>
                    <li>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    className=" hover:text-red-600 hover:bg-white px-1 py-1 hover:bg-opacity-20 rounded-sm hover:duration-500 text-xl font-semibold"
                                >
                                    Category
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions" className=' bg-custom rounded-md w-fit h-48 overflow-y-scroll  ' >
                                {
                                    Category.map((item) => {
                                        return <DropdownItem href={`/artworks/find?category=${item}`} key={item} className="hover:text-red-600 hover:bg-white px-1 py-1 hover:bg-opacity-20 rounded-sm hover:duration-500">{item}</DropdownItem>
                                    })
                                }
                            </DropdownMenu>
                        </Dropdown>
                    </li>

                    {
                        logedIn ? <>
                            <li>
                                <Dropdown placement="bottom-start">
                                    <DropdownTrigger className='border border-red-700'>
                                        <Avatar
                                            isBordered
                                            as="button"
                                            className="transition-transform"
                                            src={`${userData.img}`}
                                            alt="Profile Image"
                                        />
                                    </DropdownTrigger>
                                    <DropdownMenu className=' bg-custom  rounded-md' aria-label="Profile Actions" variant="flat">
                                        <DropdownItem key="Profile" className="h-14 gap-2 border border-red-600 rounded-3xl " href='/user/profile'>
                                            <p className="font-semibold w-fit m-auto">Signed in as</p>
                                            <p className="font-semibold w-fit m-auto"> {`${userData.firstName} ${userData.lastName}`} </p>
                                        </DropdownItem>
                                        <DropdownItem className="hover:text-red-600 hover:bg-white px-1 py-1 hover:bg-opacity-20 rounded-sm hover:duration-500" key="profile" href='/user/profile'>
                                            Profile
                                        </DropdownItem>
                                        <DropdownItem className="hover:text-red-600 hover:bg-white px-1 py-1 hover:bg-opacity-20 rounded-sm hover:duration-500" key="upload-post" href='/user/artwork/post'>
                                            Upload Post
                                        </DropdownItem>
                                        <DropdownItem className="hover:text-red-600 hover:bg-white px-1 py-1 hover:bg-opacity-20 rounded-sm hover:duration-500" key="update" href='/user/profile/update'>
                                            Update Profile
                                        </DropdownItem>
                                        <DropdownItem className="hover:text-red-600 hover:bg-white px-1 py-1 hover:bg-opacity-20 rounded-sm hover:duration-500" key="change-password" href='/user/profile/password'>
                                            Change Password
                                        </DropdownItem>
                                        <DropdownItem className=' text-red-600 hover:text-red-600 hover:bg-white px-1 py-1 hover:bg-opacity-20 rounded-sm hover:duration-500' key="logout" onClick={handleLogOut}>
                                            Log Out
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </li>
                        </> : <>
                            <li>
                                <Link className={current === "/login" ? " text-xl text-red-600" : " hover:text-red-600 hover:bg-white px-1 py-1 hover:bg-opacity-20 rounded-sm hover:duration-500 "} href={'/login'}>Login</Link>
                            </li>

                            <li>
                                <Link className={current === "/register" ? " text-xl text-red-600" : " hover:text-red-600 hover:bg-white px-1 py-1 hover:bg-opacity-20 rounded-sm hover:duration-500 "} href={'/register'}>Registration</Link>
                            </li>
                        </>
                    }
                    <li>
                        <Input
                            onChange={(e) => { setSearchValue(e.target.value) }}

                            placeholder="Search"
                            endContent={
                                <Link href={searchValue === "" ? ("/") : (`/search?keyword=${searchValue}`)}>
                                    <button className="focus:outline-none mt-2" type="button" >
                                        <Image src="/search.png" width={30} height={30} alt='Search' />
                                    </button>
                                </Link>
                            }
                            type={"search"}
                            className=" max-w-44 rounded-md bg-slate-300"
                        />
                    </li>


                </ul>
            </nav>

            <div className='hidden navbar-menu fixed top-0 left-0 bottom-0 w-5/6 max-w-sm z-50'>
                <div onClick={() => { NavClick() }} className='navbar-backdrop  fixed inset-0 bg-gray-800 opacity-25' />
                <nav className='relative flex flex-col py-6 px-6 h-full w-full bg-white border-r overflow-y-auto'>
                    <div className='flex items-center mb-8'>
                        <Link className='mr-auto leading-none p-2 bg-red-500 rounded rounded-e-full' href='/'>
                            <span className=" rounded-full font-bold text-5xl text-white">D</span> <span className=" text-xl font-bold ">ART</span>
                        </Link>
                        <button onClick={() => { NavClick() }} className='navbar-close'>
                            <svg className='h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        </button>
                    </div>
                    <div>
                        <ul>
                            <li className='mb-4'>
                                <Input
                                    onChange={(e) => { setSearchValue(e.target.value) }}

                                    placeholder="Search"
                                    endContent={
                                        <Link href={searchValue === "" ? ("/") : (`/search?keyword=${searchValue}`)}>
                                            <button className="focus:outline-none" type="button">
                                                <Image src="/search.png" width={30} height={30} alt='Search' />
                                            </button>
                                        </Link>
                                    }
                                    type={"search"}
                                    className=" max-w-full rounded-md bg-slate-300"
                                />
                            </li>
                            <li className='mb-1'>
                                <Link className={current === "/" ? "text-red-600 font-semibold p-4" : 'block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 hover:text-red-600 rounded'} href={'/'}>Home</Link>
                            </li>
                            <li className='mb-1'>
                                <Link className={current === "/artworks" ? "text-red-600 font-semibold p-4" : 'block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 hover:text-red-600 rounded'} href={'/artworks'}>Artworks</Link>
                            </li>
                            <li className='mb-1'>
                                <Link className={current === "/artists" ? "text-red-600 font-semibold p-4" : 'block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 hover:text-red-600 rounded'} href={'/artists'}>Artists</Link>
                            </li>
                            <li className=''>
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button
                                            className=" block w-full text-left my-2 pb-2 pt-1 text-sm font-semibold text-gray-400 hover:bg-green-50 hover:text-red-600 rounded"
                                        >
                                            Category
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Static Actions" className=' bg-custom rounded-md w-fit h-48 overflow-y-scroll  ' >
                                        {
                                            Category.map((item) => {
                                                return <DropdownItem key={item} className="hover:text-red-600 hover:bg-white px-1 py-1 hover:bg-opacity-20 rounded-sm hover:duration-500">{item}</DropdownItem>
                                            })
                                        }
                                    </DropdownMenu>
                                </Dropdown>
                            </li>

                            {
                                logedIn ? <li className='mb-1 p-4 block'>
                                    <Dropdown placement="bottom-start">
                                        <DropdownTrigger className='border border-red-700'>
                                            <Avatar
                                                isBordered
                                                as="button"
                                                className="transition-transform"
                                                src={`${userData.img}`}
                                                alt="Profile Image"
                                            />
                                        </DropdownTrigger>
                                        <DropdownMenu className=' bg-custom rounded-md' aria-label="Profile Actions" variant="flat">
                                            <DropdownItem key="Profile" className="h-14 gap-2 border border-red-600 rounded-3xl " href='/user/profile'>
                                                <p className="font-semibold w-fit m-auto">Signed in as</p>
                                                <p className="font-semibold w-fit m-auto"> {`${userData.firstName} ${userData.lastName}`} </p>
                                            </DropdownItem>
                                            <DropdownItem className="hover:text-red-600 hover:bg-white px-1 py-1 hover:bg-opacity-20 rounded-sm hover:duration-500" key="profile" href='/user/profile'>
                                                Profile
                                            </DropdownItem>
                                            <DropdownItem className="hover:text-red-600 hover:bg-white px-1 py-1 hover:bg-opacity-20 rounded-sm hover:duration-500" key="upload-post" href='/user/artwork/post'>
                                                Upload Post
                                            </DropdownItem>
                                            <DropdownItem className="hover:text-red-600 hover:bg-white px-1 py-1 hover:bg-opacity-20 rounded-sm hover:duration-500" key="update" href={`/user/profile/update`}>
                                                Update Profile
                                            </DropdownItem>
                                            <DropdownItem className="hover:text-red-600 hover:bg-white px-1 py-1 hover:bg-opacity-20 rounded-sm hover:duration-500" key="change-password" href={`/user/profile/password`}>
                                                Change Password
                                            </DropdownItem>
                                            <DropdownItem className=' text-red-600 hover:text-red-600 hover:bg-white px-1 py-1 hover:bg-opacity-20 rounded-sm hover:duration-500' key="logout" onClick={handleLogOut}>
                                                Log Out
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </li> : <>
                                    <li className='mb-1'>
                                        <Link className={current === "/login" ? "text-red-600 font-semibold p-4" : 'block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 hover:text-red-600 rounded'} href={'/login'}>Login</Link>
                                    </li>
                                    <li className='mb-1'>
                                        <Link className={current === "/register" ? "text-red-600 font-semibold p-4" : 'block p-4 text-sm font-semibold text-gray-400 hover:bg-green-50 hover:text-red-600 rounded'} href={'/register'}>Registration</Link>
                                    </li>
                                </>
                            }

                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );

}

export default Navbar
