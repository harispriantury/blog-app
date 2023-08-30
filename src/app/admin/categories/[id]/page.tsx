"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import supabase from '@/supabase/supabase';
import CustomInput from '@/app/components/CustomInput';
import { IFormCategory } from '@/app/interfaces/interface';
import CustomButton from '@/app/components/CustomButton';

const Detail = () => {
    const router = useRouter()
    const params = useParams();
    const [form, setForm] = useState<IFormCategory>({ name: '', description: '' });
    const handleChange = (value: string, name: string) => {
        setForm((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }
    const getDetailCategory = async () => {
        try {
            const { data } = await supabase.from('categories').select('*').eq('id', params.id).single()
            if (data) {
                setForm({
                    name: data.name,
                    description: data.description || ''
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async () => {
        //validation
        if (!form.name || !form.description) {
            alert('data tidak boleh kosong')
            return
        }
        try {
            const { error } = await supabase.from('categories').update({ name: form.name, description: form.description })
                .eq('id', params.id)
                .select()
            if (!error) {
                router.back();
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDetailCategory()
    }, [])

    return (
        <div>
            <h1>Edit Categori</h1>
            <div className='flex flex-col gap-2'>
                <div className='bg-blue-200'>
                    <CustomInput
                        label='Nama'
                        value={form.name}
                        placeholder='Masukan Nama Kategori'
                        handleChange={(value) => handleChange(value, 'name')}
                        required
                    />
                </div>
                <div className='bg-blue-200'>
                    <CustomInput
                        label='Deskripsi'
                        value={form.description}
                        placeholder='Masukan Nama Kategori'
                        handleChange={(value) => handleChange(value, 'description')}
                        required
                    />
                </div>

            </div>
            <div className='flex gap-2'>
                <CustomButton
                    text='Edit'
                    handleClick={() => handleUpdate()}
                    style='bg-green-500'
                />
                <CustomButton
                    text='Batal'
                    handleClick={() => { router.back() }}
                    style='bg-white border border-red-500 text-red-500'
                />
            </div>
        </div>
    )
}

export default Detail