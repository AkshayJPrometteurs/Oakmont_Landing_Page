"use client";
import React from "react";
import { Button } from "@heroui/react";
import Image from "next/image";
import DownloadBanerImage from "../../../../public/assets/images/download-app-left-image.png";
import DownloadOnApple from "../../../../public/assets/images/download-app-store.svg";
import DownloadOnPlayStore from "../../../../public/assets/images/download-play-store.svg";

const DownloadApp = () => {
  return (
    <section
      id="download-app-section"
      className="p-10 md:px-32 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center"
    >
      <Image src={DownloadBanerImage} alt="DownloadBanerImage" />
      <div>
        <h1 className="uppercase text-3xl md:text-5xl text-center md:text-left font-base-runner">
          Download the new Oakmont Athletic app
        </h1>
        <div className="flex flex-col md:flex-row gap-4 mt-8 items-center">
          <Button color="primary" className="h-12 max-w-[150px] md:w-auto md:px-14">
            Download For Free
          </Button>
          <div className="flex gap-4 w-full justify-center">
            <button>
              <Image
                src={DownloadOnApple}
                alt="Download On Apple"
                className="w-[130px] "
              />
            </button>
            <button>
              <Image
                src={DownloadOnPlayStore}
                alt="Download On PlayStore"
                className="w-[130px] "
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
