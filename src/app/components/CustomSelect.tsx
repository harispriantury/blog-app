"use client"
import supabase from '@/supabase/supabase';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { ICategories } from '../interfaces/interface';

interface ICustomSelect {
    value: number
    label: string
    handleChange: (id: number) => void
    required?: boolean
}

const CustomSelect: FC<ICustomSelect> = ({ value, handleChange, label, required }) => {
    const [categories, setCategories] = useState<ICategories[]>([])
    const getCategories = async () => {
        try {
            const { data } = await supabase.from('categories').select('*');
            if (data) {
                console.log(categories);
                setCategories(data as ICategories[])
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getCategories()
    }, [])
    return (
        <div className='flex flex-col gap-3 p-2'>
            <label htmlFor="">{label}{!!required && <span className='text-red-500'>*</span>}</label>
            <select
                name=""
                className='p-2 rounded-lg'
                value={value}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange(Number(e.target.value))}
                id="">
                {
                    categories.map((item) => {
                        return (
                            <option
                                key={item.id}
                                value={item.id}>
                                {item.name}
                            </option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default CustomSelect