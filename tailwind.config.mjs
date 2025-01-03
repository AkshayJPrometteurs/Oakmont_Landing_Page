/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryColor : "#0177FF",
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'Arial', 'sans-serif'],
        'base-runner': ['Base Runner', 'sans-serif'],
        'urbanist': ['Urbanist', 'sans-serif'],
      },
    },
  },
  plugins: [nextui()],
};
