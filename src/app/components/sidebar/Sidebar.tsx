import Link from 'next/link';
import React from 'react'
interface ISidebarList {
    name: string;
    url: string
}

const sidebarList: ISidebarList[] = [
    {
        name: 'Home',
        url: '/admin'
    },
    {
        name: 'Post',
        url: '/admin/posts'
    },
    {
        name: 'Kategori',
        url: '/admin/categories'
    },
    {
        name: 'User Management',
        url: '/user'
    }
];

const Sidebar = () => {
    return (
        <div className='bg-[#9DB2BF] left-0 h-full flex flex-col gap-3 pt-3 border-r-4 border-r-[#27374D]'>
            {sidebarList.map((item) => {
                return <Link
                    className='hover:font-semibold text-xl text-[#27374D] font-bold p-2 px-3'
                    key={item.name}
                    href={item.url}>
                    {item.name}
                </Link>
            })}
        </div>
    )
}

export default Sidebar