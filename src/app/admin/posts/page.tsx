"use client"
import React, { useEffect, useState } from 'react'
import CustomButton from '@/app/components/CustomButton'
import supabase from '@/supabase/supabase'
import { IPosts } from '@/app/interfaces/interface'
import { useRouter } from 'next/navigation'
import PopupConfirm from '@/app/components/PopupConfirm'
import LoadingStore from '@/store/loadingStore'
import Image from 'next/image'
import { UseConverDate } from '@/app/function/UseConvertDate'

const Admin = () => {
    const router = useRouter();
    const [posts, setPosts] = useState<IPosts[]>([]);
    const [popDelete, setPopupDelete] = useState<[boolean, string]>([false, '']);
    const setIsLoading = LoadingStore(state => state.setIsLoading)

    const getPosts = async () => {
        setIsLoading(true)
        try {
            const { data } = await supabase.from('posts').select(`*, categories(name)`);
            if (data) {
                const result: IPosts[] = data.map((item: IPosts) => {
                    const newValue = item;
                    newValue.created_at = UseConverDate(newValue.created_at);
                    return newValue
                })
                setPosts(result as IPosts[])
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const { error } = await supabase.from('posts').delete().eq('id', id);
            if (!error) {
                getPosts();
            }
            setPopupDelete([false, ''])
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])
    return (
        <div className=''>
            <h1>Daftar Post</h1>
            <div className='bg-white w-full'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th className='bg-[#27374D] border text-white border-black p-2'>id</th>
                            <th className='bg-[#27374D] border text-white border-black p-2'>Judul</th>
                            <th className='bg-[#27374D] border text-white border-black p-2'>konten</th>
                            <th className='bg-[#27374D] border text-white border-black p-2'>Penulis</th>
                            <th className='bg-[#27374D] border text-white border-black p-2'>Kategori</th>
                            <th className='bg-[#27374D] border text-white border-black p-2'>tanggal update</th>
                            <th className='bg-[#27374D] border text-white border-black p-2'>thumbnail</th>
                            <th className='bg-[#27374D] border text-white border-black p-2'>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td className='border-black border p-1 font-bold'>{item.id}</td>
                                        <td className='border-black border p-1 font-bold'>{item.title}</td>
                                        <td className='border-black border p-1 max-w-2xl overflow-hidden text-ellipsis'>{item.content}</td>
                                        <td className='border-black border p-1'>{item.author}</td>
                                        <td className='border-black border p-1'>{item.categories.name}</td>
                                        <td className='border-black border p-1'>{item.created_at}</td>
                                        <td className='border-black border p-1'>
                                            <Image
                                                src={item.thumbnail}
                                                alt={item.thumbnail}
                                                width={100}
                                                height={100} />
                                        </td>
                                        <td className='border-black border p-1'>
                                            <div className=' flex justify-center gap-3'>
                                                <CustomButton
                                                    handleClick={() => router.push('/admin/posts/' + item.id)}
                                                    text='Edit'
                                                    style='bg-blue-500 text-white'
                                                />
                                                <CustomButton
                                                    handleClick={() => setPopupDelete([true, item.id])}
                                                    text='Hapus'
                                                    style='bg-red-500 text-white'
                                                />
                                            </div>
                                        </td>
                                    </tr>

                                )
                            })
                        }
                    </tbody>
                </table>
                <div className='pt-5'>
                    <CustomButton
                        handleClick={() => router.push('/admin/posts/add')}
                        text='Tambah'
                        style='bg-green-500 text-white'
                    />
                </div>
            </div>
            {
                !!popDelete[0] && (
                    <PopupConfirm
                        handleYes={() => handleDelete(popDelete[1])}
                        handleNo={() => setPopupDelete([false, ''])}
                        info='Apakah Anda yakin ingin menghapus postingan ini ?'
                    />
                )
            }
        </div>
    )
}

export default Admin