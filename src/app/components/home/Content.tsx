"use client"
import { IPosts } from '@/app/interfaces/interface'
import Image from 'next/image'
import React, { FC } from 'react'
import { useRouter } from 'next/navigation'

interface IContent {
    data: IPosts[]
}

const Content: FC<IContent> = ({ data }) => {
    const router = useRouter();
    return (
        <div className='py-4 flex flex-col gap-3'>
            {data.map((item) => {
                return (
                    <div
                        onClick={() => router.push(`/${item.id}`)}
                        key={item.id}
                        className='cursor-pointer'>
                        <p className='text-sm text-[#6B6B6B]'> Published in <span className='font-bold text-black'>{item.categories.name}</span> - {item.created_at}</p>
                        <div
                            key={item.id}
                            className='grid grid-cols-12 h-36 items-start border-b pb-4'
                        >
                            <div className='col-span-10 pr-4'>
                                <h1 className='text-2xl font-bold'>{item.title}</h1>
                                <p className='multiline-ellipsis'>{item.summary}</p>
                            </div>
                            <div className='col-span-2 h-full flex-wrap overflow-hidden'>
                                <Image
                                    src={item.thumbnail}
                                    alt=''
                                    width={150}
                                    height={150}
                                    layout='responsive'
                                    style={{
                                        backgroundSize: 'cover'
                                    }} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Content