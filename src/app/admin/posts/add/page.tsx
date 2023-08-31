"use client"
import React, { useEffect, useState } from 'react'
import CustomButton from '@/app/components/CustomButton'
import { useRouter } from 'next/navigation'
import CustomInput from '@/app/components/CustomInput'
import CustomSelect from '@/app/components/CustomSelect'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import supabase from '@/supabase/supabase'
import { IFormPost } from '@/app/interfaces/interface'


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
    const [form, setForm] = useState<IFormPost>({
        title: '',
        author: '',
        category: 0,
        image: '',
        summary: ''
    })
    const [richText, setRichText] = useState<string>('');

    const handleChange = (value: string | number, name: string) => {
        setForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async () => {
        //validation 
        if (!form.title || !form.author || !form.category || !form.image || !richText || !form.summary) {
            alert('input belum lengkap')
            return
        }

        try {
            const { data, error } = await supabase
                .from('posts')
                .insert([
                    {
                        title: form.title,
                        author: form.author,
                        category: form.category,
                        thumbnail: form.image,
                        content: richText,
                        summary: form.summary
                    },
                ])
            if (!error) {
                alert('succes create post');
                router.back();
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className=''>
            <h1>Tambah Poss</h1>
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
                <CustomInput
                    label='Url Thumbnail'
                    placeholder='Masukan Url Thumbnail'
                    value={form.image}
                    required
                    handleChange={(value: string) => handleChange(value, 'image')}
                />
                <CustomInput
                    label='Ringkasan'
                    placeholder='Masukan Ringkasan'
                    value={form.summary}
                    required
                    handleChange={(value: string) => handleChange(value, 'summary')}
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
                    text='Tambah'
                    handleClick={() => handleSubmit()}
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