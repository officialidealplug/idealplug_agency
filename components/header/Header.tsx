"use client"
///Header component

///Libraries -->
import Image from "next/image";
import { useState, useEffect, MouseEvent, FormEvent, useCallback } from 'react';
import styles from "./header.module.scss"
import logoImg from '@/public/images/logo.png';
import { Menu } from "@mui/icons-material";
//import { ICart, IProduct, IProductFilter, IButtonResearch, IClientInfo, IOrder } from '@/config/interfaces';
import { getDevice, getItem, getOS, notify, setItem } from "@/config/clientUtils"
import { companyName, sleep, clientInfoName, getCurrentDate, getCurrentTime, extractBaseTitle, storeButtonInfo } from '@/config/utils'
import { usePathname, useRouter } from 'next/navigation';
import { IButtonResearch, IClientInfo } from "@/config/interfaces";
//import { ShoppingCartOutlined, FavoriteBorder, Search, Menu, ArrowBack, Close, AccountCircleOutlined, KeyboardArrowRight } from "@mui/icons-material";
//import Loading from "../loadingCircle/Circle";
import { useModalBackgroundStore, useContactModalStore, useMenuModalStore, useLoadingModalStore, useClientInfoStore } from "@/config/store";

///Commencing the code 
/**
 * @title Header Component
 * @returns The Header component
 */
const Header = () => {
  const setModalBackground = useModalBackgroundStore(state => state.setModalBackground);
  const setContactModal = useContactModalStore(state => state.setContactModal);
  const setMenuModal = useMenuModalStore(state => state.setMenuModal);
  const router = useRouter()
  const [scrollY, setScrollY] = useState<number | undefined>(undefined);
  const routerPath = usePathname();
  const _clientInfo = getItem(clientInfoName)
  const [clientInfo, setClientInfo] = useState<IClientInfo | undefined>(_clientInfo!)
  // const [accountModal, setAccountModal] = useState<boolean>(false)
  // const _userId = getItem(userIdName)
  // const [userId, setUserId] = useState<string>(_userId!)
  // const [mounted, setMounted] = useState(false);

  //This function is triggered when a navigation button is clicked
  const clickNav = (e: MouseEvent<HTMLButtonElement>, section: string) => {
    e.preventDefault();

    router.push(`/#${section}`)

    //Storing this info in button research
    const info: IButtonResearch = {
        ID: clientInfo?._id!,
        IP: clientInfo?.ipData?.ip!,
        City: clientInfo?.ipData?.city!,
        Region: clientInfo?.ipData?.region!,
        Country: clientInfo?.ipData?.country!,
        Button_Name: "viewHeaderNav()",
        Button_Info: `Clicked ${section} in header`,
        Page_Title: extractBaseTitle(document.title),
        Page_URL: routerPath,
        Date: getCurrentDate(),
        Time: getCurrentTime(),
        OS: getOS(),
        Device: getDevice()
    }

    storeButtonInfo(info)
  }

  //This function is triggered when a user clicks on contact us
  const openContactModal = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
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
        Button_Name: "openContactModal()",
        Button_Info: `Clicked contact us in header`,
        Page_Title: extractBaseTitle(document.title),
        Page_URL: routerPath,
        Date: getCurrentDate(),
        Time: getCurrentTime(),
        OS: getOS(),
        Device: getDevice()
    }

    storeButtonInfo(info)
  }

  //This function is triggered when a user clicks on menu button
  const openMenuModal = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    setModalBackground(true)
    await sleep(0.2)
    setMenuModal(true)

    //Storing this info in button research
    const info: IButtonResearch = {
        ID: clientInfo?._id!,
        IP: clientInfo?.ipData?.ip!,
        City: clientInfo?.ipData?.city!,
        Region: clientInfo?.ipData?.region!,
        Country: clientInfo?.ipData?.country!,
        Button_Name: "openMenuModal()",
        Button_Info: `Clicked menu icon in header`,
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
    <header className={`${styles.header} ${scrollY! >= 1 ? styles.scrolled : ""}`}>
      <div className={styles.logo_text}>
        <div className={styles.logo} onClick={() => router.push('/')}>
          <Image
            className={styles.img}
            src={logoImg.src}
            alt={'logo'}
            width={logoImg.width}
            height={logoImg.height}
          />
        </div>
        <div className={styles.text}>
          <span>{companyName}</span>
        </div>
      </div>
      <div className={styles.navBar}>
        <button onClick={(e) => clickNav(e, "about")}><span>About Us</span></button>
        <button onClick={(e) => clickNav(e, "services")}><span>Services</span></button>
        <button onClick={(e) => clickNav(e, "projects")}><span>Projects</span></button>
        {/* <button onClick={(e) => clickNav(e, "workflow")}><span>Workflow</span></button> */}
      </div>
      <button className={styles.contactBtn} onClick={(e) => openContactModal(e)}>
        <span>Contact us</span>
      </button>
      <button className={styles.menuBtn} onClick={(e) => openMenuModal(e)}>
        <Menu className={styles.icon} />
      </button>
    </header>
  );
};

export default Header;