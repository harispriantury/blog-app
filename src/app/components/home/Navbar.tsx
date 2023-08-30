"use client"
import Link from 'next/link'
import React from 'react'
import { FaCircleUser } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'
import CustomButton from '../CustomButton'

const Navbar = () => {
    return (
        <nav className='flex justify-between items-center bg-[#27374D] p-4'>
            <div className='flex items-center'>
                <p className='text-white'>logo</p>
                <input type="text" placeholder='search' />
            </div>
            <div className='flex items-center gap-3 text-3xl text-white cursor-pointer relative'>
                <FaCircleUser />
                <span className='text-base'>
                    <IoIosArrowDown />
                </span>
                <Link href={'/admin'} className='bg-[#526D82] text-white text-base px-3 py-2 rounded-lg'>
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