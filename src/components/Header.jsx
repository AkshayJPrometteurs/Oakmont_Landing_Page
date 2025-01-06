"use client";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import Menus from '../components/Menus';
import DrawerModule from "./Drawer";

export default function Header() {
    const navItems = Menus();
    const {isOpen,onOpen,onOpenChange} = useDisclosure();
    return (
        <Navbar className="bg-white shadow navbar-heading font-dm-sans">
            <NavbarBrand>
                <img alt="logo" src="assets/images/logo.svg" className="hidden md:block" />
                <img alt="logo" src="assets/images/only-logo.png" className="block md:hidden max-w-12" />
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4">
                {navItems.map((item) => (
                    <NavbarItem key={item.url}>
                        <Link color="foreground" href={item.url} className="px-2">{item.name}</Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Link href="/login" className="px-5 py-[0.6rem] rounded-full border border-gray-400">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/signup" className="bg-primaryColor px-5 py-[0.6rem] rounded-full text-white">Get Started</Link>
                </NavbarItem>
                <NavbarItem className="block md:hidden">
                    <Button isIconOnly onPress={onOpen}><GiHamburgerMenu/></Button>
                </NavbarItem>
            </NavbarContent>
            <DrawerModule isOpen={isOpen} onOpenChange={onOpenChange} placement={'left'} className="max-w-60" header={<img alt="logo" src="assets/images/logo.svg" className="h-12" />} headerClassName={'flex flex-col justify-start gap-1 pl-0'}>
                {navItems.map((item) => (
                    <Link key={item.url} color="foreground" href={item.url} className="text-center hover:bg-primaryColor hover:text-white w-full p-2 rounded-md">{item.name}</Link>
                ))}
            </DrawerModule>
        </Navbar>
    );
}
