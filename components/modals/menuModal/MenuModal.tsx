"use client"
///Menu Modal component

///Libraries -->
import styles from "./menuModal.module.scss"
import { useModalBackgroundStore, useMenuModalStore, useContactModalStore } from "@/config/store";
import { MouseEvent, useState, FormEvent } from "react";
import { Close } from "@mui/icons-material";
import Image from "next/image";
import { backend, sleep } from "@/config/utils";
import logoImg from "@/public/images/logo.png"
import { useRouter } from 'next/navigation';
import { IButtonResearch, IClientInfo } from "@/config/interfaces";
import { getDevice, getOS, getItem } from "@/config/clientUtils";
import { clientInfoName, getCurrentDate, getCurrentTime, extractBaseTitle, storeButtonInfo } from "@/config/utils";
import { usePathname } from "next/navigation";

///Commencing the code 

/**
 * @title Menu Modal Component
 * @returns The Menu Modal component
 */
const MenuModal = () => {
    const setMenuModal = useMenuModalStore(state => state.setMenuModal);
    const setContactModal = useContactModalStore(state => state.setContactModal);
    const setModalBackground = useModalBackgroundStore(state => state.setModalBackground);
    const menuModal = useMenuModalStore(state => state.modal);
    const router = useRouter()
    const _clientInfo = getItem(clientInfoName)
    const [clientInfo, setClientInfo] = useState<IClientInfo | undefined>(_clientInfo!)
    const routerPath = usePathname();

    ///This function is triggered when the background of the modal is clicked
    const closeMenuModal = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        setMenuModal(false)
        setModalBackground(false)
        //console.log("modal closed")

        //Storing this info in button research
        const info: IButtonResearch = {
            ID: clientInfo?._id!,
            IP: clientInfo?.ipData?.ip!,
            City: clientInfo?.ipData?.city!,
            Region: clientInfo?.ipData?.region!,
            Country: clientInfo?.ipData?.country!,
            Button_Name: "closeMenuModal()",
            Button_Info: `Clicked close icon in menu modal`,
            Page_Title: extractBaseTitle(document.title),
            Page_URL: routerPath,
            Date: getCurrentDate(),
            Time: getCurrentTime(),
            OS: getOS(),
            Device: getDevice()
        }
    
        storeButtonInfo(info)
    }

    //This function is triggered when a navigation button is clicked
    const clickNav = async (e: MouseEvent<HTMLButtonElement>, section: string) => {
        e.preventDefault();

        setMenuModal(false)
        await sleep(0.2)

        if (section === "contact") {
            setContactModal(true)
        } else {
          setModalBackground(false)

          //Navigate to the section
          router.push(`/#${section}`)
        }

        //Storing this info in button research
        const info: IButtonResearch = {
            ID: clientInfo?._id!,
            IP: clientInfo?.ipData?.ip!,
            City: clientInfo?.ipData?.city!,
            Region: clientInfo?.ipData?.region!,
            Country: clientInfo?.ipData?.country!,
            Button_Name: "clickNav()",
            Button_Info: `Clicked nav button ${section} in menu modal`,
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
    <div className={`${styles.main} ${menuModal ? styles.activeMenu : styles.inActiveMenu}`}>
        <div className={styles.menu_heading}>
        <button className={styles.close_button} onClick={(e) => closeMenuModal(e)}>
            <Close />
        </button>
        <div className={styles.logo}>
            <Image
            className={styles.img}
            src={logoImg.src}
            alt="logo"
            width={logoImg.width}
            height={logoImg.height}
            />
        </div>
        </div>
        <button className={`${styles.links}`} onClick={(e) => clickNav(e, "about")}><span>About Us</span></button>
        <button className={styles.links} onClick={(e) => clickNav(e, "services")}><span>Services</span></button>
        <button className={styles.links} onClick={(e) => clickNav(e, "projects")}><span>Projects</span></button>
        <button className={`${styles.links}`} onClick={(e) => { clickNav(e, "contact") }}><span>Contact Us</span></button>
      </div>
  );
};

export default MenuModal;