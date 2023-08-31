"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import supabase from '@/supabase/supabase';
import { IPosts } from '@/app/interfaces/interface';
import { UseConverDate } from '../function/UseConvertDate';
import Image from 'next/image';
import Navbar from '../components/home/Navbar';

const Detail = () => {
    const params = useParams();
    const [post, setPost] = useState<IPosts>()

    const getDetail = async () => {
        try {
            const { data } = await supabase.from('posts').select('*, categories(name)').eq('id', params.id).single();
            if (data) {
                //mapping
                const result = data as IPosts
                const date: string = UseConverDate(data.created_at);
                result.created_at = date;
                setPost(result as IPosts)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { getDetail() }, [])
    return (
        <section id='post-detail' className='flex justify-center'>
            <Navbar />
            <main className='bg-white w-6/12 pt-32 px-6 min-h-screen flex flex-col gap-5'>
                <h1 className='text-4xl font-extrabold'>{post?.title}</h1>
                <div className='flex items-center gap-4 mt-4'>
                    <div className='w-12 h-12 rounded-full bg-green-500 overflow-hidden'>
                        <Image
                            alt=''
                            src={'/profile.jpg'}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className=''>
                        <h1 className='font-bold'>{post?.author} <span className='text-green-700 ml-2' >Follow</span></h1>
                        <p className='text-sm'>Published in <span className='font-bold'>{post?.categories.name}</span> - {post?.created_at}</p>
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='w-1/3 '>
                        <Image src={post?.thumbnail!} alt='' width={1000} height={1000} />
                    </div>
                    <div className='py-10 custom'>
                        <div dangerouslySetInnerHTML={{ __html: post?.content! }}>

                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Detail