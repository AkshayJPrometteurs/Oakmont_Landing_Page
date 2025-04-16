/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
import { heroui } from "@heroui/react";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primaryColor : "#321fb7",
                primary : {
                    DEFAULT : '#321fb7'
                }
            },
            fontFamily: {
                'dm-sans': ['DM Sans', 'Arial', 'sans-serif'],
                'base-runner': ['Base Runner', 'sans-serif'],
                'urbanist': ['Urbanist', 'sans-serif'],
            },
        },
    },
    plugins: [heroui()],
};
