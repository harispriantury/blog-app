import React, { ChangeEvent } from 'react'
import { BiSolidShow } from 'react-icons/bi'

interface ICustomInput {
    label: string,
    value: string,
    placeholder: string,
    handleChange: (value: string) => void
    required?: boolean,
    type?: string,
    showPassword?: () => void
}

const CustomInput: React.FC<ICustomInput> = ({ label, value, placeholder, handleChange, required = false, type = 'text', showPassword }) => {
    return (
        <div className='relative flex flex-col gap-3 p-2'>
            <label htmlFor="">{label}{!!required && (<span className='text-red-500'>*</span>)}</label>
            <div className='relative'>
                <input
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
                    className='p-2 rounded-lg w-full border border-[#526D82]'
                />
                {
                    showPassword && (
                        <button
                            className='w-5 text-xl absolute right-2 top-1/4'
                            onClick={() => showPassword()}
                        >
                            <BiSolidShow />
                        </button>
                    )
                }

            </div>
        </div>
    )
}

export default CustomInput