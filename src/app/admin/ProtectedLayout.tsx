"use client"
import useLoginStore from '@/store/userStore'
import React, { FC, ReactNode } from 'react'
import Login from '../components/Login'
import LoadingStore from '@/store/loadingStore'
import LoadingOverlay from '../components/LoadingOverlay'

interface IProtectedLayout {
    children: ReactNode
}

const ProtectedLayout: FC<IProtectedLayout> = ({ children }) => {
    // zustand
    const isLogin = useLoginStore((state) => state.isLogin);
    const isLoading = LoadingStore(state => state.isLoading)
    return (
        <div>
            {
                isLoading && (<LoadingOverlay />)
            }
            {isLogin ? (<div>{children}</div>) : <Login />}
        </div>
    )
}

export default ProtectedLayout