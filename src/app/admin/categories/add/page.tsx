"use client"
import CustomButton from '@/app/components/CustomButton'
import CustomInput from '@/app/components/CustomInput'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IFormCategory } from '@/app/interfaces/interface'
import supabase from '@/supabase/supabase'

const AddCategory = () => {
    const router = useRouter();
    const [form, setForm] = useState<IFormCategory>({ name: '', description: '' });
    const handleChange = (value: string, name: string) => {
        setForm((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleSubmit = async () => {
        //validation
        if (!form.name || !form.description) {
            alert('data ada yang kosong')
            return
        }

        try {
            const { data, error } = await supabase
                .from('categories')
                .insert([
                    { name: form.name, description: form.description },
                ])
                .select();

            if (!error) router.back()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h1>Tambah Kategori baru</h1>
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
                    text='Tambah'
                    handleClick={() => { handleSubmit() }}
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

export default AddCategory