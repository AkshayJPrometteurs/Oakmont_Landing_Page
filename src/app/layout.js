import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Fragment } from "react";
import theme from '../components/theme';

const geistSans = Geist({variable: "--font-geist-sans", subsets: ["latin"]});
const geistMono = Geist_Mono({variable: "--font-geist-mono", subsets: ["latin"]});
export const metadata = {title: "Create Next App", description: "Generated by create next app"};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Fragment>
                        <Header/>
                        {children}
                    </Fragment>
                </ThemeProvider>
            </body>
        </html>
    );
}
