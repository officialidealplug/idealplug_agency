"use client"
///Hero component

///Libraries -->
import styles from "./hero.module.scss"
import { useRouter } from "next/navigation";
import Image from "next/image";
import heroImg from '@/public/images/hero_illustration.png';
import { MouseEvent, useState } from "react";
import { useContactModalStore, useModalBackgroundStore } from "@/config/store";
import { IButtonResearch, IClientInfo } from "@/config/interfaces";
import { getDevice, getItem, getOS } from "@/config/clientUtils";
import { clientInfoName, getCurrentDate, getCurrentTime, extractBaseTitle, storeButtonInfo } from "@/config/utils";
import { usePathname } from "next/navigation";

///Commencing the code 
  
/**
 * @title Hero Component
 * @returns The Hero component
 */
const Hero = () => {
    const router = useRouter()
    const setModalBackground = useModalBackgroundStore(state => state.setModalBackground)
    const setContactModal = useContactModalStore(state => state.setContactModal)
    const _clientInfo = getItem(clientInfoName)
    const [clientInfo, setClientInfo] = useState<IClientInfo | undefined>(_clientInfo!)
    const routerPath = usePathname();

    //This function is triggered when get started button is clicked
    const getStarted = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();

        setContactModal(true)
        setModalBackground(true)

        //Storing this info in button research
        const info: IButtonResearch = {
            ID: clientInfo?._id!,
            IP: clientInfo?.ipData?.ip!,
            City: clientInfo?.ipData?.city!,
            Region: clientInfo?.ipData?.region!,
            Country: clientInfo?.ipData?.country!,
            Button_Name: "getStarted()",
            Button_Info: `Clicked get started in hero section`,
            Page_Title: extractBaseTitle(document.title),
            Page_URL: routerPath,
            Date: getCurrentDate(),
            Time: getCurrentTime(),
            OS: getOS(),
            Device: getDevice()
        }
    
        storeButtonInfo(info)
    }
      
    return (
        <main className={styles.main}>
            <div className={styles.content}>
                <div className={styles.text1}>We Help People Bring Their Ideas Alive</div>
                <div className={styles.text2}>We are an experienced and talented team dedicated to helping you in your journey on creating intuitive and impactful products that converts and grow your business</div>
                <button className={styles.contentBtn} onClick={(e) => getStarted(e)}>
                    <span>Let's get started!</span>
                </button>
            </div> 
            <div className={styles.imgContainer}>
                <Image 
                    className={styles.background}
                    src={heroImg.src}
                    alt={"Hero Image"}
                    width={heroImg.width!}
                    height={heroImg.height!}
                    //unoptimized
                />
            </div>
        </main>
    );
};
  
export default Hero;