"use client"
///Hire component

///Libraries -->
import styles from "./hire.module.scss"
import { MouseEvent, useState } from "react"
import { useRouter, usePathname } from 'next/navigation';
import { useModalBackgroundStore, useContactModalStore } from "@/config/store";
import { IButtonResearch, IClientInfo } from "@/config/interfaces";
import { getDevice, getItem, getOS } from "@/config/clientUtils";
import { clientInfoName, getCurrentDate, getCurrentTime, extractBaseTitle, storeButtonInfo } from "@/config/utils";

///Commencing the code 

/**
 * @title Hire Component
 * @returns The Hire component
 */
const Hire = () => {
  const setModalBackground = useModalBackgroundStore(state => state.setModalBackground)
  const setContactModal = useContactModalStore(state => state.setContactModal)
  const _clientInfo = getItem(clientInfoName)
  const [clientInfo, setClientInfo] = useState<IClientInfo | undefined>(_clientInfo!)
  const routerPath = usePathname();

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
        Button_Info: `Clicked contact us in hire section`,
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
    <div className={`${styles.main}`}>
      <div className={styles.container}>
          <div className={styles.span1}>Have a Project in mind?</div>
          <div className={styles.span2}>Hire Us</div>
          <div className={styles.span3}>
              <span>By hiring us, you can expect a team of dedicated professionals who are committed to delivering robust, reliable and scalable software solutions. We are ready to collaborate with you to bring your ideas to life and drive your business forward.</span>
              <span>Let&apos;s connect and discuss how we can contribute to your success.</span>
          </div>
          <button onClick={(e) => openContactModal(e)}><span>Contact us</span></button>
      </div>
    </div>
  );
};

export default Hire;