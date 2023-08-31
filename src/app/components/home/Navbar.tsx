"use client"
import Link from 'next/link'
import React from 'react'
import { FaCircleUser } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'
import CustomButton from '../CustomButton'
import Logo from '../Logo'

const Navbar = () => {
    return (
        <nav className='fixed right-0 left-0 flex justify-between items-center bg-[#27374D] px-5 py-3'>
            <div className='flex items-center gap-5'>
                <Logo />
            </div>
            <div className='flex items-center gap-3 text-3xl text-white cursor-pointer relative'>
                <input
                    className='px-3 py-2 rounded-lg text-base text-black mr-6'
                    placeholder='search'
                />
                <FaCircleUser />
                <span className='text-base'>
                    <IoIosArrowDown />
                </span>
                <Link href={'/admin'} className='bg-white text-[#27374D] text-base px-3 py-2 rounded-lg'>
                    CMS
                </Link>
                <div className='absolute bg-yellow-200 top-full right-1/2 p-10 text-base hidden'>
                    <h1 className='text-black'>Get Started on Blog</h1>
                    <div>
                        <CustomButton
                            handleClick={() => { }}
                            style={''}
                            text='Sign Up'
                        />
                        <CustomButton
                            handleClick={() => { }}
                            style={''}
                            text='Sign In'
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar