"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, useDisclosure, Alert, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Divider } from "@heroui/react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import Menus from '@/components/utils/Menus';
import DrawerModule from "./Drawer";
import { useAuthServiceContext } from "@/contexts/AuthServiceProvider";
import { LuUserRound } from "react-icons/lu";
import Image from "next/image";
import Logo from '../../../public/assets/images/logo.svg';
import LogoOnly from '../../../public/assets/images/only-logo.png';
import { GoAlertFill } from "react-icons/go";
import Modals from "./Modals";
import { Inter } from "next/font/google";
import { Fragment, useState } from "react";
import Axios from "./Axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { MdOutlineLogout } from "react-icons/md";

const inter = Inter({subsets : ['latin']});
export default function Header() {
    const navItems = Menus();

    const { isOpen: isOpenAppDrawer, onOpen: onOpenAppDrawer, onOpenChange: onOpenChangeAppDrawer } = useDisclosure();
    const { isOpen: isOpenLogOut, onOpen: onOpenLogOut, onOpenChange: onOpenChangeLogOut, onClose: onCloseLogOut } = useDisclosure();
    const { isAuthenticated, user } = useAuthServiceContext();

    const [logOutLoader, setLogOutLoader] = useState(false);

    const handleLogOut = async() => {
        setLogOutLoader(true);
        try{
            const token = Cookies.get('_om_rt');
            const { data } = await Axios.post('/users/logout',{ refresh_token: token });
            if(data?.status_code === 200 && data?.success){
                Cookies.remove('_om_at');
                Cookies.remove('_om_rt');
                Cookies.remove('_om_uda');
                onCloseLogOut();
                toast(<Alert color='success' title={data?.message} />, {closeButton:false});
                setTimeout(() => { location.reload(); },1500)
            }
        } catch(err){ console.log(err) } finally{ setLogOutLoader(false); }
    }

    return (
        <Navbar className="bg-white shadow navbar-heading font-dm-sans">
            <NavbarBrand>
                <Image src={Logo} alt="Logo" className="hidden md:block"/>
                <Image src={LogoOnly} alt="Logo" className="block md:hidden max-w-10"/>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4">
                {navItems.map((item) => (
                    <NavbarItem key={item.url}>
                        <Link color="foreground" href={item.url} className="px-2">
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end" className="gap-2 md:gap-4">
                <NavbarItem>
                    {isAuthenticated ? (
                        <Dropdown placement="bottom-center">
                            <DropdownTrigger className="cursor-pointer">
                                <div className="flex items-center rounded-full px-3 py-2 border border-gray-400">
                                    <LuUserRound className="text-lg md:text-2xl font-normal"/>
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat" classNames={{ list : 'p-0 m-0' }}>
                                <DropdownItem key="profile" className="gap-2">
                                    <Avatar
                                        className="w-16 h-16 mx-auto mb-3"
                                        src={user?.profile_url || "https://i.pravatar.cc/150?u=a04258114e29026708c"}
                                    />
                                    <p className="font-bold text-primaryColor text-center text-base">{user && user.username}</p>
                                    <p className="text-center text-base text-gray-600">{user && user.email}</p>
                                </DropdownItem>
                                <DropdownItem key="8">
                                    <Divider/>
                                </DropdownItem>
                                <DropdownItem key="1" onPress={onOpenLogOut} className="text-danger" color="danger">
                                    <div className='flex items-center justify-center'>
                                        <MdOutlineLogout className="text-2xl" />
                                        <span>Logout</span>
                                    </div>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    ):(
                        <Link href="/login" className="px-3.5 py-2 md:px-5 md:py-2.5 text-sm md:text-base rounded-full border border-gray-400">Login</Link>
                    )}
                </NavbarItem>

                <NavbarItem>
                    <Link href={isAuthenticated ? '/manage-subscription' : "/signup"} className="bg-primaryColor px-3.5 py-2 md:px-5 md:py-2.5 text-sm md:text-base rounded-full text-white">{isAuthenticated ? 'Manage Subscription' : "Get Started"}</Link>
                </NavbarItem>

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
                        <Button startContent={<MdOutlineLogout className="text-2xl" />} aria-label="LogOut" color="danger" variant="shadow" onPress={onOpenLogOut} className="w-full">Logout</Button>
                    </div>
                )}
            </DrawerModule>

            <Modals isOpen={isOpenLogOut} onOpenChange={onOpenChangeLogOut} hideCloseButton={true} modalBodyClass={'p-0 gap-[0!important]'} isDismissable={false}>
                <div className={`text-center py-6 px-4 ${inter.className}`}>
                    <GoAlertFill className="text-danger text-4xl md:text-5xl mx-auto"/>
                    <h1 className="text-2xl font-bold mt-6 mb-2">Logout</h1>
                    <p>Are you sure you would like to logout of your account?</p>
                </div>
                <div className={`bg-gray-100 flex items-center gap-4 justify-center py-4 px-2 ${inter.className}`}>
                    {logOutLoader ? (
                        <Button color="primary" disabled isLoading className="px-6" onPress={onCloseLogOut}>Please wait...</Button>
                    ):(
                        <Fragment>
                            <Button color="default" className="px-6" onPress={onCloseLogOut}>No! Cancel</Button>
                            <Button color="danger" className="px-6" onPress={handleLogOut}>Yes! Logout</Button>
                        </Fragment>
                    )}
                </div>
            </Modals>
        </Navbar>
    );
}
