import React from 'react';
import "./globals.css";
import '@fontsource/dm-sans';
import { AuthServiceContext } from "@/contexts/AuthServiceProvider";

export const metadata = {
    title: "Oakmont Athletic",
    description: "Oakmont Athletic"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`antialiased`}>
                <main><AuthServiceContext>{children}</AuthServiceContext></main>
            </body>
        </html>
    );
}
