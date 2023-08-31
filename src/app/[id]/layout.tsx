import { ReactNode } from "react";
import type { Metadata } from "next";
import LoadingOverlay from "../components/LoadingOverlay";

export const metadata: Metadata = {
    title: 'Haris | Post',
    description: 'ini halaman post'
}
export default function RootLayout({ children }: {
    children: ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}