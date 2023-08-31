"use client"
import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import { useRouter } from 'next/navigation'
import useLoginStore from '@/store/userStore';

interface IUser {
    username: string,
    password: string,
}

const Login = () => {
    const setIsLogin = useLoginStore((state) => state.setIsLogin);
    const [typePassword, setTypePassword] = useState<string>('password')
    const [user, setUser] = useState<IUser>({
        username: '',
        password: ''
    })


    const handleLogin = () => {
        if (user.username === 'username' && user.password === 'password') {
            setIsLogin(true)
        } else {
            alert('password salah')
            setIsLogin(false)
        };

    }

    const handleChange = (value: string, name: string) => {
        setUser((p) => ({
            ...p,
            [name]: value
        }))
    }

    return (
        <div>
            <div className='flex justify-center'>
                <h1 className='text-3xl font-bold'>Login</h1>
                <div className='flex flex-col items-center mt-20 bg-white w-1/2 rounded-3xl'>
                    <CustomInput
                        label='username'
                        placeholder='Masukan Username'
                        value={user.username}
                        handleChange={(value) => handleChange(value, 'username')}
                    />
                    <CustomInput
                        label='password'
                        placeholder='Masukan Password'
                        type={typePassword}
                        showPassword={() => setTypePassword(typePassword === 'password' ? 'text' : 'password')}
                        value={user.password}
                        handleChange={(value) => handleChange(value, 'password')}
                    />
                    <CustomButton
                        handleClick={() => handleLogin()}
                        style='bg-[#27374D] text-white'
                        text='Login'
                    />
                </div>
            </div>
        </div >
    )
}

export default Login