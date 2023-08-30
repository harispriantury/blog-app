import LoadingStore from '@/store/loadingStore'
import React from 'react'

const LoadingOverlay = () => {
    return (
        <div className='fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-40 flex justify-center items-center'>
            <div className='w-10 h-10 border border-gray-400 text-transparent rounded-full border-t-2 border-t-white animate-spin'>
                Loading ..
            </div>
        </div>
    )
}

export default LoadingOverlay