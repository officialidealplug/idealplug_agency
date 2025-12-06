"use client"
///About Us component

///Libraries -->
import styles from "./aboutUs.module.scss"
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import aboutImg from '@/public/images/about_img1.jpg';
import { MouseEvent, useState } from "react";
import { companyName, clientInfoName, getCurrentDate, getCurrentTime, extractBaseTitle, storeButtonInfo } from "@/config/utils";
import { IClientInfo, IButtonResearch } from "@/config/interfaces";
import { useModalBackgroundStore, useLoadingModalStore } from "@/config/store";
import { getDevice, getOS, getItem } from "@/config/clientUtils";

///Commencing the code 
  
/**
 * @title About us Component
 * @returns The About us component
 */
const AboutUs = () => {
    const router = useRouter()
    const routerPath = usePathname();
    const _clientInfo = getItem(clientInfoName)
    const [clientInfo, setClientInfo] = useState<IClientInfo | undefined>(_clientInfo!)
    const setModalBackground = useModalBackgroundStore(state => state.setModalBackground);
    const setLoadingModal = useLoadingModalStore(state => state.setLoadingModal)

    //This function is trigerred when verify cert is clicked
    const verifyCert = async (e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
        e.preventDefault()

        //Setting the loading
        setModalBackground(true)
        setLoadingModal(true)

        //Storing this info in button research
        const info: IButtonResearch = {
            ID: clientInfo?._id!,
            IP: clientInfo?.ipData?.ip!,
            City: clientInfo?.ipData?.city!,
            Region: clientInfo?.ipData?.region!,
            Country: clientInfo?.ipData?.country!,
            Button_Name: "verifyCert()",
            Button_Info: `Clicked verify cert`,
            Page_Title: extractBaseTitle(document.title),
            Page_URL: routerPath,
            Date: getCurrentDate(),
            Time: getCurrentTime(),
            OS: getOS(),
            Device: getDevice()
        }
        storeButtonInfo(info)

        //Visiting the verification
        if (typeof window !== undefined) {
            window.open("https://icis.corp.delaware.gov/ecorp2/services/validate", "_blank")
        }

        setModalBackground(false)
        setLoadingModal(false)
    }
      
    return (
        <main className={styles.main} id="about">
            <div className={styles.content}>
                <div className={styles.heading}>
                    <div className={styles.heading1}>About Us</div>
                    <div className={styles.heading2}>Why leading Companies trust us?</div>
                </div>
                <div className={styles.text}>
                    <span>
                        As a US Corporation, we&apos;re built on a solid foundation of transparency and integrity.
                        <br />
                        At {companyName} Agency, We focus on building software solutions that solve real problems, deliver great user experiences, and drive meaningful growth. Whether you&apos;re launching something new or improving what you already have, we bring clarity, innovation, and precision to every project. We build digital experiences that move people and grow businesses.
                    </span>
                </div>
            </div> 
            <div className={styles.imgContainer}>
                <Image 
                    className={styles.background}
                    src={aboutImg.src}
                    alt={"Hero Image"}
                    width={aboutImg.width!}
                    height={aboutImg.height!}
                    //unoptimized
                />
            </div>
        </main>
    );
};
  
export default AboutUs;