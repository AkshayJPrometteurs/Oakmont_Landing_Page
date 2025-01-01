"use client";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Drawer, DrawerContent, DrawerHeader, DrawerBody, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { Fragment } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Menus from '../components/Menus';

export default function Header() {
    const navItems = Menus();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
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
                    <Link href="#"><Button variant="bordered" radius="full">Login</Button></Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#"><Button color="primary" radius="full">Get Started</Button></Link>
                </NavbarItem>
                <NavbarItem className="block md:hidden">
                    <Button isIconOnly onPress={onOpen}><GiHamburgerMenu/></Button>
                </NavbarItem>
            </NavbarContent>
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left" size="xs">
                <DrawerContent>
                    {(onClose) => (
                        <Fragment>
                            <DrawerHeader className="flex flex-col justify-start gap-1 pl-0">
                                <img alt="logo" src="assets/images/logo.svg" className="h-14" />
                            </DrawerHeader>
                            <DrawerBody>
                            {navItems.map((item) => (
                                <Link key={item.url} color="foreground" href={item.url}>{item.name}</Link>
                            ))}
                            </DrawerBody>
                        </Fragment>
                    )}
                </DrawerContent>
            </Drawer>
        </Navbar>
    );
}
