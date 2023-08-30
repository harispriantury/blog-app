import React from 'react'
import Image from 'next/image'
import CustomButton from '../CustomButton'
import { SlUserFollow } from 'react-icons/sl'
import { BsLinkedin } from 'react-icons/bs'
import { MdOutlineEmail } from 'react-icons/md'

const Profile = () => {
    return (
        <section id='profile' className='col-span-4 flex flex-col p-8 items-center' >
            <div className='rounded-full overflow-hidden w-28'>
                <Image width={150} height={150} src='/profile.jpg' alt={''} />
            </div>
            <h1 className='text-lg font-bold'>Haris Priantury</h1>
            <p className=''>Interasting in web development and mobile development</p>
            <div className='flex gap-3 mt-5'>
                <CustomButton
                    handleClick={() => { }}
                    style='bg-[#526D82] text-white'
                    text='Follow'
                    icons={SlUserFollow}
                />
                <CustomButton
                    handleClick={() => { }}
                    style='bg-green-400 text-white'
                    icons={BsLinkedin}
                />
                <CustomButton
                    handleClick={() => { }}
                    style='bg-red-700 text-white'
                    icons={MdOutlineEmail}
                />
            </div>
        </section >
    )
}

export default Profile



