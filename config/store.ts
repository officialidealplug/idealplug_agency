///This acts as store for generally used state variables

///Libraries -->
import { create } from "zustand";
import { IModalBackgroundStore, IContactModalStore, IClientInfoStore, ILoadingModalStore, IMenuModalStore } from "@/config/interfaces";

//Commencing code -->

//Modal Background state store
export const useModalBackgroundStore = create<IModalBackgroundStore>((set) => ({
    modal: false,
    setModalBackground: (status) => set(() => ({ modal: status }))
}))

//Contact Modal state store
export const useContactModalStore = create<IContactModalStore>((set) => ({
    modal: false,
    setContactModal: (status) => set(() => ({ modal: status }))
}))

//Menu Modal state store
export const useMenuModalStore = create<IMenuModalStore>((set) => ({
    modal: false,
    setMenuModal: (status) => set(() => ({ modal: status }))
}))

//Loading Modal state store
export const useLoadingModalStore = create<ILoadingModalStore>((set) => ({
    modal: false,
    setLoadingModal: (status) => set(() => ({ modal: status }))
}))

//Client Info State Store
export const useClientInfoStore = create<IClientInfoStore>((set) => ({
    info: undefined,
    setClientInfo: (info) => set(() => ({ info: info }))
})) 