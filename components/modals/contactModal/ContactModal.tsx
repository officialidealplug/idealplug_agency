"use client"
///Contact Modal component

///Libraries -->
import styles from "./contactModal.module.scss"
import { useModalBackgroundStore, useContactModalStore } from "@/config/store";
import { MouseEvent, useState, FormEvent } from "react";
import Loading from "@/components/loadingCircle/Circle";
import { Place, Close, Business } from "@mui/icons-material";
import Image from "next/image";
import { capitalizeFirstLetter, backend, getCurrentDate, getCurrentTime, clientInfoName, storeButtonInfo, extractBaseTitle } from "@/config/utils";
import { notify, getItem, getDevice, getOS } from "@/config/clientUtils";
import validator from "validator";
import { IInquiry, IButtonResearch, IClientInfo } from "@/config/interfaces";
import contactImg from "@/public/images/contact_img.jpg"
import { usePathname } from "next/navigation";
import { set } from "mongoose";

///Commencing the code 

/**
 * @title Contact Modal Component
 * @returns The Contact Modal component
 */
const ContactModal = () => {
    const setContactModal = useContactModalStore(state => state.setContactModal);
    const setModalBackground = useModalBackgroundStore(state => state.setModalBackground);
    const contactModal = useContactModalStore(state => state.modal);
    const [fullName, setFullName] = useState<string | undefined>("") 
    const [subject, setSubject] = useState<string | undefined>("")
    const [emailAddress, setEmailAddress] = useState<string | undefined>("")
    const [message, setMessage] = useState<string | undefined>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const _clientInfo = getItem(clientInfoName)
    const [clientInfo, setClientInfo] = useState<IClientInfo | undefined>(_clientInfo!)
    const routerPath = usePathname();

    ///This function is triggered when the background of the modal is clicked
    const closeContactModal = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        setContactModal(false)
        setModalBackground(false)
        //console.log("modal closed")

        //Storing this info in button research
        const info: IButtonResearch = {
            ID: clientInfo?._id!,
            IP: clientInfo?.ipData?.ip!,
            City: clientInfo?.ipData?.city!,
            Region: clientInfo?.ipData?.region!,
            Country: clientInfo?.ipData?.country!,
            Button_Name: "closeContactModal()",
            Button_Info: `Clicked close icon in contact us modal`,
            Page_Title: extractBaseTitle(document.title),
            Page_URL: routerPath,
            Date: getCurrentDate(),
            Time: getCurrentTime(),
            OS: getOS(),
            Device: getDevice()
        }
    
        storeButtonInfo(info)
    }

    ///This sends the message from contact-us
  const sendInquiry = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): Promise<void> => {
    e.preventDefault()

    //Validating args
    if (!fullName) {
      notify("error", "Name is required")
      return
    } else if (!subject) {
        notify("error", "Subject is required")
        return
    } else if (!emailAddress) {
        notify("error", "Email address is required")
        return
    } else if (!validator.isEmail(emailAddress)) {
        notify("error", "Email address is not valid")
        return
    } else if (!message) {
        notify("error", "Message is required")
        return
    }

    setIsLoading(() => true)

    //Storing this info in button research
    const info: IButtonResearch = {
        ID: clientInfo?._id!,
        IP: clientInfo?.ipData?.ip!,
        City: clientInfo?.ipData?.city!,
        Region: clientInfo?.ipData?.region!,
        Country: clientInfo?.ipData?.country!,
        Button_Name: "sendInquiry()",
        Button_Info: `Clicked submit message in contact us modal`,
        Page_Title: extractBaseTitle(document.title),
        Page_URL: routerPath,
        Date: getCurrentDate(),
        Time: getCurrentTime(),
        OS: getOS(),
        Device: getDevice()
    }

    storeButtonInfo(info)

    //Send the order to the backend
    try {
      //console.log('Clicked')
      const inquiry: IInquiry = { fullName, emailAddress, subject, message }
      console.log("Order: ", inquiry)
      const res = await fetch(`${backend}/inquiry/`, {
          method: 'POST',
          body: JSON.stringify(inquiry),
          headers: {
          'Content-Type': 'application/json',
          },
      });
      
      const data = await res.json();
      console.log("Data: ", data);

      if (res.ok) {
        notify("success", `Your message was sent successfully`)
        setFullName("")
        setEmailAddress("")
        setSubject("")
        setMessage("")
        closeContactModal(e)
        //typeof window !== 'undefined' && window.location ? window.location.reload() : null
      } else {
        throw Error(`${data.message}`)
      }
    
    } catch (error: any) {
        console.log("error: ", error)
        notify("error", `${error.message}`)
    }

    setIsLoading(() => false)
  }

  return (
    <div className={styles.main} style={{ display: contactModal ? "flex" : "none"}}>
          <div className={styles.image}>
            <Image
              className={styles.img}
              src={contactImg.src}
              alt="contact"
              width={contactImg.width}
              height={contactImg.height}
            />
            <div className={styles.addr}>
                <Business className={styles.icon} />
                <span>1111B S Governors Ave, STE 28549, Dover, Delaware. 19904</span>
            </div>
          </div>
          <div className={styles.form}>
            <header>
              <button onClick={(e) => closeContactModal(e)}>
                <Close />
              </button>
            </header>
            <div className={styles.brief}>
              <span id={styles.brief_1}>
                <strong>We&apos;d love to help</strong>
              </span>
              <span id={styles.brief_2}>Reach out and we&apos;ll get in touch within 24 hours</span>
            </div>
            <form>
              <div className={styles.div_1}>
                <div className={styles.div_11}>
                  <input
                    placeholder="Full Name"
                    type="text"
                    onChange={(e) => setFullName(() => capitalizeFirstLetter(e.target.value))}
                    value={fullName}
                  />
                </div>
                <div className={styles.div_12}>
                  <input
                    placeholder="Email Address"
                    type="email"
                    onChange={(e) => setEmailAddress(() => e.target.value)}
                    value={emailAddress}
                  />
                </div>
              </div>
              <div className={styles.div_2}>
                <input
                  placeholder="Subject"
                  type="text"
                  onChange={(e) => setSubject(() => capitalizeFirstLetter(e.target.value))}
                  value={subject}
                />
              </div>
              <div className={styles.div_3}>
                <textarea
                  placeholder="What do you have in mind?"
                  onChange={(e) => setMessage(() => e.target.value)}
                  value={message}
                ></textarea>
              </div>
              <button onClick={(e) => sendInquiry(e)}>
                {isLoading ? (
                  <Loading width="20px" height="20px" />
                ) : (
                  <span>Submit</span>
                )}
              </button>
            </form>
          </div>
        </div>
  );
};

export default ContactModal;