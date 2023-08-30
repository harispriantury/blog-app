"use client"
import React, { useEffect, useState } from 'react'
import CustomButton from '@/app/components/CustomButton'
import { useRouter, useParams } from 'next/navigation'
import CustomInput from '@/app/components/CustomInput'
import CustomSelect from '@/app/components/CustomSelect'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import supabase from '@/supabase/supabase'

interface IFormPost {
    title: string,
    author: string,
    category: number
}

const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};

const AddPost = () => {
    const router = useRouter();
    const { id } = useParams();
    const [form, setForm] = useState<IFormPost>({
        title: '',
        author: '',
        category: 0,
    })
    const [richText, setRichText] = useState<string>('');

    const getDetailPost = async () => {
        try {
            const { data } = await supabase.from('posts').select('*').eq('id', id).single();
            if (data) {
                console.log(data);
                setForm({
                    title: data.title,
                    author: data.author,
                    category: data.category
                })
                setRichText(data.content)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (value: string | number, name: string) => {
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleUpdate = async () => {
        //validation 
        if (!form.title || !form.author || !form.category || !richText) {
            alert('input belum lengkap')
            return
        }

        try {
            const { data, error } = await supabase
                .from('posts')
                .update(
                    {
                        title: form.title,
                        author: form.author,
                        category: form.category,
                        content: richText
                    }
                ).eq('id', id)
            if (!error) {
                alert('succes update data');
                router.back();
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDetailPost();
    }, [])
    return (
        <div className=''>
            <h1>edit post Poss</h1>
            <div>
                <CustomInput
                    label='Judul'
                    placeholder='Masukan Judul Baru'
                    value={form.title}
                    required
                    handleChange={(value: string) => handleChange(value, 'title')}
                />
                <CustomSelect
                    required
                    label='Pilih Kategori'
                    handleChange={(value: number) => handleChange(value, 'category')}
                    value={form.category}
                />
                <CustomInput
                    label='Penulis'
                    placeholder='Masukan Judul Baru'
                    value={form.author}
                    required
                    handleChange={(value: string) => handleChange(value, 'author')}
                />
                <div>
                    <ReactQuill
                        theme="snow"
                        value={richText}
                        modules={modules}
                        onChange={(e: string) => setRichText(e)} />
                </div>
                <div>
                    <div dangerouslySetInnerHTML={{ __html: richText }}>

                    </div>
                </div>
            </div>
            <div className='flex gap-2'>
                <CustomButton
                    text='simpan'
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

export default AddPost