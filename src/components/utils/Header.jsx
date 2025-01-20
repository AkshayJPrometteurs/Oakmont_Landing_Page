"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, useDisclosure, Alert } from "@heroui/react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import Menus from '@/components/utils/Menus';
import DrawerModule from "./Drawer";
import { useAuthServiceContext } from "@/contexts/AuthServiceProvider";
import { LuUserRound } from "react-icons/lu";
import Image from "next/image";
import Logo from '../../../public/assets/images/logo.svg';
import LogoOnly from '../../../public/assets/images/only-logo.png';
import { IoLogOut } from "react-icons/io5";
import { GoAlertFill } from "react-icons/go";
import Modals from "./Modals";
import { Inter } from "next/font/google";
import { Fragment, useState } from "react";
import Axios from "./Axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const inter = Inter({subsets : ['latin']});
export default function Header() {
    const router = useRouter();
    const navItems = Menus();

    const { isOpen: isOpenAppDrawer, onOpen: onOpenAppDrawer, onOpenChange: onOpenChangeAppDrawer } = useDisclosure();
    const { isOpen: isOpenSignOut, onOpen: onOpenSignOut, onOpenChange: onOpenChangeSignOut, onClose: onCloseSignOut } = useDisclosure();
    const { isAuthenticated } = useAuthServiceContext();
    const [signOutLoader, setSignOutLoader] = useState(false);

    const handleSignOut = async() => {
        const token = Cookies.get('_om_at');
        setSignOutLoader(true);
        try{
            const { data } = await Axios.post('/users/logout',{ refresh_token: token });
            if(data?.status_code === 200 && data?.success){
                router.push('/');
                toast(<Alert color='success' title={data?.message} />, {closeButton:false});
            }
        } catch(err){ console.error(err) } finally{ setSignOutLoader(false); }
    }

    return (
        <Navbar className="bg-white shadow navbar-heading font-dm-sans">
            <NavbarBrand>
                <Image src={Logo} alt="Logo" className="hidden md:block"/>
                <Image src={LogoOnly} alt="Logo" className="block md:hidden max-w-12"/>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4">
                {navItems.map((item) => (
                    <NavbarItem key={item.url}>
                        <Link color="foreground" href={item.url} className="px-2">{item.name}</Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end" className="gap-2 md:gap-4">
                <NavbarItem>
                    {isAuthenticated ? (
                        <Link href="#" className="flex items-center rounded-full px-3 py-2 border border-gray-400"><LuUserRound className="text-2xl font-normal"/></Link>
                    ):(
                        <Link href="/login" className="px-5 py-2.5 rounded-full border border-gray-400">Login</Link>
                    )}
                </NavbarItem>

                <NavbarItem>
                    <Link href={isAuthenticated ? 'manage-subscription' : "/signup"} className="bg-primaryColor px-5 py-2.5 rounded-full text-white">{isAuthenticated ? 'Manage Subscription' : "Get Started"}</Link>
                </NavbarItem>

                {isAuthenticated && (
                    <NavbarItem className="hidden md:block">
                        <Button isIconOnly aria-label="SignOut" color="danger" onPress={onOpenSignOut}>
                            <IoLogOut className="text-2xl" />
                        </Button>
                    </NavbarItem>
                )}

                <NavbarItem className="block md:hidden">
                    <Button isIconOnly onPress={onOpenAppDrawer}><GiHamburgerMenu/></Button>
                </NavbarItem>
            </NavbarContent>

            <DrawerModule isOpen={isOpenAppDrawer} onOpenChange={onOpenChangeAppDrawer} placement={'left'} className="max-w-[15rem!important]" header={<img alt="logo" src="assets/images/logo.svg" className="h-12" />} headerClassName={'flex flex-col justify-start gap-1 pl-0'}>
                {navItems.map((item) => (
                    <Link key={item.url} color="foreground" href={item.url} className="text-center hover:bg-primaryColor hover:text-white w-full p-2 rounded-md">{item.name}</Link>
                ))}
                {isAuthenticated && (
                    <div className="absolute bottom-3 w-full left-0 px-4">
                        <Button startContent={<IoLogOut className="text-2xl" />} aria-label="SignOut" color="danger" variant="shadow" onPress={onOpenSignOut} className="w-full">Sign Out</Button>
                    </div>
                )}
            </DrawerModule>

            <Modals isOpen={isOpenSignOut} onOpenChange={onOpenChangeSignOut} hideCloseButton={true} modalBodyClass={'p-0 gap-[0!important]'} isDismissable={false}>
                <div className={`text-center py-6 px-4 ${inter.className}`}>
                    <GoAlertFill className="text-danger text-4xl md:text-5xl mx-auto"/>
                    <h1 className="text-2xl font-bold mt-6 mb-2">Sign Out</h1>
                    <p>Are you sure you would like to sign out of your account?</p>
                </div>
                <div className={`bg-gray-50 flex items-center gap-4 justify-center py-4 px-2 ${inter.className}`}>
                    {signOutLoader ? (
                        <Button color="primary" disabled isLoading className="px-6" onPress={onCloseSignOut}>Please wait...</Button>
                    ):(
                        <Fragment>
                            <Button color="default" className="px-6" onPress={onCloseSignOut}>Cancel</Button>
                            <Button color="danger" className="px-6" onPress={handleSignOut}>Sign Out</Button>
                        </Fragment>
                    )}
                </div>
            </Modals>
        </Navbar>
    );
}
