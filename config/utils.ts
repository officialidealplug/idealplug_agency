//This is the utils file

//Libraries -->
import { IEventResearch, ISheetInfo, IButtonResearch, IMetaWebEvent, ClientOS, ClientDevice, IService } from './interfaces';
import axios from 'axios';
import { createHash } from 'crypto';
import { ArrowBack, Code, DesignServices, DeveloperMode, FeaturedVideo, Smartphone } from '@mui/icons-material';

//Commencing code
export const companyName: string = "Idealplug"

export const domainName: string = process.env.NEXT_PUBLIC_DOMAIN_NAME! //"http://localhost:3000"

export const companyEmail: string = "support@idealplug.com"

export const clientInfoName: string = "idealPlugClientInfo"

export const userIdName: string = "idealPlugUserId"

export const backend = process.env.NEXT_PUBLIC_BACKEND! //"http://localhost:3000/api"

export const statSheetId: string = "1sxI_f2u4Pyxfp-8lwZr6O42YWpIJSEvVfAPrAjkB-oQ"

export const SUPPORT_EMAIL: string = companyEmail

export const SUPPORT_PASSWORD: string = process.env.NEXT_PUBLIC_SENDER_PASSWORD!

/**
 * @notice This gets the current date
 * @returns The current date
 */
export const getCurrentDate = (): string => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    // Format the date as desired, e.g., "YYYY-MM-DD"
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
}

//This function is used to hash a value
export function hashValue(value: string, algorithm: 'sha256' | 'sha512' | 'md5' = 'sha256'): string {
    if (!value || typeof value !== 'string') {
        console.log("Non hashable value")
        return value;
    }

    return createHash(algorithm).update(value, 'utf8').digest('hex');
}

///The function delays the code
export const sleep = (seconds: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

///This checks for a router path and renders the necessary style for it
export const routeStyle = (router: string, styles: { readonly [key: string]: string } ): string => {
    //console.log("Router: ", router)
    switch (router) {
        case "/":
            return styles.homePage
        case "/cart":
            return styles.cartPage
        case "/wishlist":
            return styles.wishListPage
        case "/terms":
            return styles.termsPage
        case "/order":
            return styles.orderPage
        case "/about":
            return styles.aboutPage
        case "/faqs":
            return styles.faqsPage
        case "/products":
            return styles.productPage
        default:
            if (router.includes("/admin/login")) {
                return styles.adminLoginPage
            } else if (router.includes("/admin")) {
                return styles.adminPage
            } else if (router.includes("/products/")) {
                return styles.productInfoPage
            } else if (router.includes("/order/receipt")) {
                return styles.orderReceiptPage
            } else {
                return styles.others
            }
    }
}

//This contains the list of all services offered by the agency
export const serviceList: Array<IService> = [
    {
        icon: DesignServices,
        title: "Graphic & UI/UX Design",
        text: "Offering innovative graphic and UI/UX design services that bring your brand to life. We create visually stunning designs that enhance user experience, ensuring your digital presence is both attractive and functional."
    },
    {
        icon: DeveloperMode,
        title: "Mobile Development", 
        text: "Creating user-friendly mobile applications for both Android and iOS platforms. Our apps are designed to provide seamless performance, intuitive navigation, and engaging user experiences that keep your audience connected on the go."
    },
    {
        icon: Code,
        title: "Web & Software Development",
        text: "Building responsive and dynamic websites and software tailored to your business needs, designed to deliver smooth user experiences, strong performance, and a digital presence that grows with your brand."
    },
    {
        icon: FeaturedVideo,
        title: "Digital Marketing",
        text: "Providing comprehensive digital marketing solutions to boost your online presence. From SEO and social media management to targeted advertising campaigns, we help you reach and engage your audience effectively."
    }
]

///This function capitalizes the first letter of every word
export const capitalizeFirstLetter = (str: string): string => {
    if (str) {
        return str.replace(/\b\w/g, (match) => match.toUpperCase());
    } else {
        return str
    }
}

//This function keeps track of clicked buttons
export const storeButtonInfo = async (info: IButtonResearch) => {
    try {
        const sheetInfo: ISheetInfo = {
            sheetId: statSheetId,
            sheetRange: "Button!A:M",
            data: info
        }

        const res = await fetch(`${backend}/sheet`, {
            method: "POST",
            body: JSON.stringify(sheetInfo),
        });
        //console.log("Google Stream: ", res)
    } catch (error) {
        console.log("Store Error: ", error)
    }
}

//This function keeps track of events
export const storeEventInfo = async (info: IEventResearch) => {
    console.log("Event Info: ", info)

    try {
        const sheetInfo: ISheetInfo = {
            sheetId: statSheetId,
            sheetRange: "Events!A:G",
            data: info
        }

        const res = await fetch(`${backend}/sheet`, {
            method: "POST",
            body: JSON.stringify(sheetInfo),
        });
        //console.log("Google Stream: ", res)
    } catch (error) {
        //console.log("Store Error: ", error)
    }
}

//This function sends event data to meta-capi api 
export const sendMetaCapi = async (eventData: IMetaWebEvent, userId: string, OS: ClientOS, Device: ClientDevice) => {

    //This meta api is not yet active
    return

    try {
        const res = await axios.post(`${backend}/meta-capi`, eventData, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log("Meta Response: ", res.data)
    } catch (error) {
        console.log("Error Meta CAPI: ", error)
    }
    
    try {
        //Sending data to my excel sheet
        const data = eventData.data[0]
        const info: IEventResearch = {
            ID: userId,
            EventName: data.event_name,
            Data: JSON.stringify(data),
            Date: getCurrentDate(),
            Time: getCurrentTime(),
            OS: OS,
            Device: Device
        }
        await storeEventInfo(info) 
    } catch (error) {
        console.log("Error Excel Event Store: ", error)
    }
}

///This extracts title
export const extractBaseTitle = (title: string): string => {
    const [baseTitle] = title.split(' | '); // Split by ' | ' and take the first part
    return baseTitle;
}
  
/**
 * @notice This gets the current time
 * @returns The current time
 */
export const getCurrentTime = (): string => {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    const meridian = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    // Add leading zeros if necessary
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    // Format the time as desired, e.g., "hh:mm AM/PM"
    const formattedTime = `${formattedHours}:${formattedMinutes} ${meridian}`;

    return formattedTime;
}
