"use client"
///Modal component

///Libraries -->
import styles from "./modal.module.scss"
import { useModalBackgroundStore } from "@/config/store";
import { MouseEvent, Suspense } from "react";
import ContactModal from "../contactModal/ContactModal";
import LoadingModal from "../loadingModal/LoadingModal";
import Loading from "@/components/loadingCircle/Circle";
import MenuModal from "../menuModal/MenuModal";

///Commencing the code 
function Fallback() {
  return <Loading width="20px" height="20px" />
}

/**
 * @title Modal Component
 * @returns The Modal component
 */
const Modal = () => {
    const setModal = useModalBackgroundStore(state => state.setModalBackground);
    const modalBackground = useModalBackgroundStore(state => state.modal);

    ///This function is triggered when the background of the modal is clicked
    const closeModal = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        e.preventDefault()

        //setModal(false)
    }

  return (
    <div className={styles.main} style={{ display: modalBackground ? "flex" : "none" }} onClick={(e) => closeModal(e)}>
        <ContactModal />
        <LoadingModal />
        <MenuModal />
    </div>
  );
};

export default Modal;