"use client"
import React, { useEffect, useState } from 'react'
import { IPosts, ImenuBar } from '@/app/interfaces/interface'
import supabase from '@/supabase/supabase'
import Content from './Content'
import About from './About'
import { UseConverDate } from '@/app/function/UseConvertDate'

const menuBars: ImenuBar[] = [
    {
        name: 'Home',
        code: 'home'
    },
    {
        name: 'About',
        code: 'about'
    }
]


const MenuBar = () => {
    const [activeBar, setActiveBar] = useState<string>('home');
    const [dataPost, setDataPost] = useState<IPosts[]>([])
    const getPost = async () => {
        try {
            const { data } = await supabase.from('posts').select('*, categories(name)');
            if (data) {
                const mapper: IPosts[] = data.map((item: IPosts) => {
                    const result = UseConverDate(item.created_at)
                    const newValue = item;
                    newValue.created_at = result;
                    return newValue
                })
                setDataPost(mapper as IPosts[]);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPost();
    }, [])
    return (
        <div className='w-full'>
            <div className='flex border-b gap-4'>
                {
                    menuBars.map((item) => {
                        return (
                            <button
                                className={`${item.code === activeBar ? 'border-b-2 border-black font-bold' : ''}`}
                                onClick={() => setActiveBar(item.code)}
                                key={item.code}>
                                {item.name}
                            </button>
                        )
                    })
                }
            </div>
            {
                activeBar === 'home' ? (
                    <Content data={dataPost} />
                ) : (
                    <About />
                )
            }
        </div>
    )
}

export default MenuBar