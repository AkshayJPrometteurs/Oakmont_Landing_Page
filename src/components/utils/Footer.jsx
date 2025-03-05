import React from "react";
import Menus from "@/components/utils/Menus";
import Link from "next/link";
import { Divider } from "@heroui/react";
import Image from "next/image";
import FooterImage from "../../../public/assets/images/footer-logo.png";
import DownloadOnApple from "../../../public/assets/images/applestore-with-border.svg";
import DownloadOnPlayStore from "../../../public/assets/images/playstore-with-border.svg";

const Footer = () => {
  const footerMenus = Menus();
  return (
    <footer className="bg-[#262626] text-white p-6 md:p-8 font-dm-sans">
      <Image src={FooterImage} className="mx-auto" alt="FooterImage" />
      <div className="flex flex-row flex-wrap justify-center items-center gap-y-4 gap-x-10 md:gap-10 my-10">
        {footerMenus.map((data, index) => (
          <Link 
            key={index} 
            href={data.url}
            className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-200"
          >
            {data.name}
          </Link>
        ))}
      </div>
      <div className="mt-10">
        <p className="text-center mb-4">
          Download the new oakmont athletic app
        </p>
        <div className="flex justify-center gap-4 w-full">
          <button>
            <Image
              src={DownloadOnApple}
              alt="Download On Apple"
              className="w-[130px]"
            />
          </button>
          <button>
            <Image
              src={DownloadOnPlayStore}
              alt="Download On Play Store" 
              className="w-[130px]"
            />
          </button>
        </div>
      </div>
      <Divider className="bg-[#E6E6E6] mt-8 mb-4" />
      <div className="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-4">
        <p>Copyrights ©2024 Oakmont Athletic</p>
        <div className="flex gap-y-4 gap-x-8 items-center">
          <Link 
            href={"#"} 
            className="text-xs md:text-sm text-gray-400 hover:text-white  transition-colors duration-200"
          >
            Terms & Conditions
          </Link>
          <Link 
            href={"#"} 
            className="text-xs md:text-sm text-gray-400 hover:text-white  transition-colors duration-200"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;