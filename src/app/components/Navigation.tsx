"use client"
import React, { useState } from 'react'
import CustomButton from './CustomButton'
import useLoginStore from '@/store/userStore';
import { useRouter } from 'next/navigation'
import PopupConfirm from './PopupConfirm';
import { BiSolidUserCircle } from 'react-icons/bi'
import { IoIosHome } from 'react-icons/io'
import { TbLogout2 } from 'react-icons/tb'
import Image from 'next/image';
import Logo from './Logo';

const Navigation = () => {
    const router = useRouter();
    const setIsLogin = useLoginStore((state) => state.setIsLogin);
    const isLogin = useLoginStore((state) => state.isLogin);
    const [popUp, setPopUp] = useState<boolean>(false);
    const handleLogout = () => {
        setIsLogin(false);
        setPopUp(false)
    }
    return (
        <nav className='bg-[#27374D] text-white flex justify-between px-5 py-3 gap-8 '>
            <div className='flex items-center gap-10'>
                <Logo />
                <CustomButton
                    handleClick={() => router.push('/')}
                    style='bg-white text-[#27374D]'
                    text='Beranda'
                    icons={IoIosHome}
                />
            </div>
            {
                !!isLogin && (
                    <div className='flex items-center gap-4'>
                        <div className='flex items-center text-4xl'>
                            <BiSolidUserCircle />
                            <p className='text-2xl'>Haris Priantury</p>
                        </div>
                        <CustomButton
                            handleClick={() => setPopUp(true)}
                            style='bg-white text-black text-[#27374D]'
                            text='Logout'
                            icons={TbLogout2}
                        />
                    </div>
                )
            }
            {
                !!popUp && (
                    <PopupConfirm
                        handleNo={() => { setPopUp(false) }}
                        handleYes={handleLogout}
                        textYes='Log out'
                        info='Apakah Anda ingin logout ?'
                    />
                )
            }
        </nav >
    )
}

export default Navigation