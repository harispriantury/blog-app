import React, { FC } from 'react'
import CustomButton from './CustomButton'

interface IPopUpConfirm {
    info: string,
    handleYes: () => void,
    handleNo: () => void,
    textYes?: string
}

const PopupConfirm: FC<IPopUpConfirm> = ({ info, handleYes, handleNo, textYes = 'Hapus' }) => {
    return (
        <div className='bg-black fixed top-0 left-0 h-screen w-screen bg-opacity-30 flex justify-center items-center z-50'>
            <div className='bg-white p-12 rounded-lg text-center flex flex-col items-center gap-5 text-black'>
                <h1>{info}</h1>
                <div className='flex gap-4'>
                    <CustomButton
                        handleClick={() => handleYes()}
                        style='bg-red-500 text-white'
                        text={textYes}
                    />
                    <CustomButton
                        handleClick={() => handleNo()}
                        style='bg-white text-red-500 border-red-500 border'
                        text='Batal'
                    />
                </div>

            </div>
        </div>
    )
}

export default PopupConfirm