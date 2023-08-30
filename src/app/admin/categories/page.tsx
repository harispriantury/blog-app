'use client'
import CustomButton from '@/app/components/CustomButton'
import { ICategories } from '@/app/interfaces/interface'
import supabase from '@/supabase/supabase'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PopupConfirm from '@/app/components/PopupConfirm'
import useLoginStore from '@/store/userStore'
import LoadingStore from '@/store/loadingStore'

const Categories = () => {
    const router = useRouter();
    const [categories, setCategories] = useState<ICategories[]>([]);
    const [popDelete, setPopupDelete] = useState<[boolean, number]>([false, 0]);
    const setIsLoading = LoadingStore(state => state.setIsLoading);

    const getCategories = async () => {
        setIsLoading(true);
        try {
            const { data } = await supabase.from('categories').select('*');
            if (data) {
                setCategories(data as ICategories[])
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const { error } = await supabase
                .from('categories')
                .delete()
                .eq('id', id);

            console.log('sukses menghapus data')
            getCategories();
            setPopupDelete([false, 0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])
    return (
        <div className=''>
            <h1>Daftar Kategori</h1>
            <div className='bg-blue-200 w-full'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nama Kategori</th>
                            <th>Description</th>
                            <th>Waktu dibuat</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map((item) => {
                                return (
                                    <tr key={item.name}>
                                        <th>{item.id}</th>
                                        <th>{item.name}</th>
                                        <th>{item.description}</th>
                                        <th>{item.created_at}</th>
                                        <th className='flex justify-center gap-3'>
                                            <CustomButton
                                                handleClick={() => router.push(`/admin/categories/${item.id}`)}
                                                text='Edit'
                                                style='bg-blue-500 text-white'
                                            />
                                            <CustomButton
                                                handleClick={() => setPopupDelete([true, item.id])}
                                                text='Hapus'
                                                style='bg-red-500 text-white'
                                            />
                                        </th>
                                    </tr>

                                )
                            })
                        }
                    </tbody>
                </table>
                <CustomButton
                    handleClick={() => { router.push('/admin/categories/add') }}
                    text='Tambah'
                    style='bg-green-500 text-white'
                />
            </div>
            {
                !!popDelete[0] && (
                    <PopupConfirm
                        handleYes={() => handleDelete(popDelete[1])}
                        handleNo={() => setPopupDelete([false, 0])}
                        info='Apakah Anda yakin ingin menghapus ?'
                    />
                )
            }
        </div>
    )
}

export default Categories