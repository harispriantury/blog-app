import React, { FC, ReactNode } from 'react'
import { IconType } from 'react-icons'

interface ICustomButton {
    text?: string,
    handleClick: () => void,
    style: string,
    icons?: IconType
}

const CustomButton: FC<ICustomButton> = ({ text, handleClick, style, icons }) => {
    return (
        <button
            className={`rounded-xl px-4 flex items-center gap-2  py-3 ${style}`}
            onClick={() => handleClick()}
        >
            <div>
                {
                    !!icons && React.createElement(icons, { size: '25' })
                }
            </div>
            {text}
        </button>
    )
}

export default CustomButton