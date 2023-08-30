import Link from 'next/link'
import React from 'react'

export default function NotFound() {
    return (
        <div>
            <h2>Mohon Maaf URL Tidak Tersedia</h2>
            <p>Could not find requested resource</p>
            <Link href="/">Kembali Ke home</Link>
        </div>
    )
}