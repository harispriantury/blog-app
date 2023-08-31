import React from 'react'

const Logo = () => {
    return (
        <div className='flex w-24 gap-1 h-12 items-center'>
            <div className='flex flex-col items-end leading-[60%] text-2xl mt-2'>
                <p className='text-orange-500 font-extrabold'>BLOG</p>
                <p className='text-orange-400 text-base'>Haris</p>
            </div>
            <div className='flex gap-[2px] h-10 text-transparent'>
                <p className='bg-orange-600 h-full'>1</p>
                <p className='bg-orange-500 h-full'>2</p>
                <p className='bg-orange-400 h-full'>3</p>
            </div>
        </div>
    )
}

export default Logo