import React from 'react';
import "./globals.css";
import '@fontsource/dm-sans';
import { AuthServiceContext } from "@/contexts/AuthServiceProvider";
import {HeroUIProvider} from "@heroui/react";

export const metadata = {
    title: "Oakmont Athletic",
    description: "Oakmont Athletic"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`antialiased`}>
                <main>
                    <AuthServiceContext>
                        <HeroUIProvider>{children}</HeroUIProvider>
                    </AuthServiceContext>
                </main>
            </body>
        </html>
    );
}
