///This would contain all interfaces that will be used

///Libraries -->
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import { StaticImageData } from 'next/image';
import { Model } from 'mongoose';

///Commencing the code -->
///This declares the interface for image
export interface IImage {
  _id?: string,
  driveId?: string,
  name?: string,
  src: string,
  alt?: string,
  width?: number,
  height?: number,
  type?: string //"image" | "video"
}

//Interface for modal store
export interface IModalBackgroundStore {
  modal: boolean;
  setModalBackground: (status: boolean) => void
}

//Interface for contact modal store
export interface IContactModalStore {
  modal: boolean;
  setContactModal: (status: boolean) => void
}

/**
 * @notice The interface for newsletter subscribers mongoose schema static
 */
export interface INewsModel extends Model<INews> {
  createSubscriber(subscriber: INews): INews,
  getAllSubscriber(): Array<INews>,
  deleteSubscriber(id: string): INews
}

//Interface for contact modal store
export interface IMenuModalStore {
  modal: boolean;
  setMenuModal: (status: boolean) => void
}

///Declaring the interface for inquiry
export interface IInquiry {
  _id?: string,
  fullName: string,
  emailAddress: string,
  subject: string, 
  message: string
  createdAt?: string,
  updatedAt?: string,
  __v?: number
}

///Declaring the interface for inquiry mongoose schema static
export interface IInquiryModel extends Model<IInquiry> {
  createInquiry(inquiry: IInquiry): Array<IInquiry>,
  getAllInquiries(): Array<IInquiry>,
  getInquiryById(id: string): Array<IInquiry>
  deleteInquiry(id: string): IInquiry//
}

//Interface for loading modal store
export interface ILoadingModalStore {
  modal: boolean;
  setLoadingModal: (status: boolean) => void
}

//Interface for country location
export interface ICountryLocation {
  continent?: string,
  subContinent?: string,
  geoCordinates?: {
    longitude?: number,
    latitude?: number
  },
  mapLink?: string
}

//The interface for event status
export interface IEventStatus {
  status?: string,
  color?: {
    text?: string,
    background?: string
  }
}

//The enum for meta events
export enum MetaStandardEvent {
  AddToCart = "AddToCart",
  AddToWishlist = "AddToWishlist",
  AddPaymentInfo = "AddPaymentInfo",
  Purchase = "Purchase",
  PageView = "PageView",
  ViewContent = "ViewContent",
  InitiateCheckout = "InitiateCheckout",
  Search = "Search",
  CompleteRegistration = "CompleteRegistration"
}

//The enum for meta action source
export enum MetaActionSource {
  app = "app",
  chat = "chat",
  email = "email",
  other = "other",
  phone_call = "phone_call",
  physical_store = "physical_store",
  system_generated = "system_generated",
  website = "website",
}

//Meta event parameters
export interface IMetaWebEvent {
  data: Array<{
      event_name: MetaStandardEvent | string,
      event_time: number,
      event_id: string,
      action_source: MetaActionSource,
      user_data?: {
          client_user_agent: string,
          client_ip_address: string,
          external_id: string, //A unique id for the user and should be returned using SHA256
          fbc: string, //This is click id
          fbp: string, //This is browser id
          fn?: string, //This is first name and should be returned using SHA256
          ln?: string, //This is last name and should be returned using SHA256
          ge?: string, //This is gender (m/f) and should be returned using SHA256
          db?: string, //This is date of birth (YYYYMMDD) and should be returned using SHA256
          em?: Array<string>, //This is email and should be returned using SHA256
          ph?: Array<string>, //This is phone number and should be returned using SHA256
          ct?: string, //This is city in lowercase and should be returned using SHA256
          st?: string, //This is state in lowercase 2-letter-code and should be returned using SHA256
          country?: string, //This is country in lowercase 2-letter-code and should be returned using SHA256
          zp?: string, //This is zip code in 5digits and should be returned using SHA256
      },
      custom_data?: {
          content_name: string, //Name of the product or page
          content_category?: string,
          content_ids?: Array<string>,
          content_type?: "product" | "product_group",
          contents?: Array<Object>,
          currency?: string, //"USD",
          value?: number, //142.52
          num_items?: string, //Only used with initiated checkout event 
          order_id?: string,
      },
      attribution_data?: {
        attribution_share: string
      },
      original_event_data?: {
          event_name?: string,
          event_time?: number
      }
  }>
}

//Interface for cached data
export interface ICacheData {
  value: any;
  timestamp: number; // Timestamp when the data was set
  expirationTime: number; // Expiration time in seconds
}

//This is the interface for traffic research
export interface ITrafficResearch {
  ID: string,
  IP: string,
  City: string,
  Region: string,
  Country: string,
  Page_Title: string,
  Page_URL: string,
  Date: string,
  Time: string,
  OS: ClientOS,
  Device: ClientDevice
}

//This is the interface for button research
export interface IButtonResearch {
  ID: string,
  IP: string,
  City: string,
  Region: string,
  Country: string,
  Button_Name: string,
  Button_Info: string,
  Page_Title: string,
  Page_URL: string,
  Date: string,
  Time: string,
  OS: ClientOS,
  Device: ClientDevice
}

/**
 * @notice The interface for newsletter subscribers mongoose schema
 * @param subscriber The email address of the subscriber
 */
 export interface INews {
  _id?: string,
  subscriber: string,
  createdAt?: string,
  updatedAt?: string,
  __v?: number
}

///Type for metadata arg props
export type Props = {
  params: Promise<{ [key: string]: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

//This is the interface for services
export interface IService {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string },
  title: string,
  text: string
}

//This is the interface for testimonies
export interface ITestimonial {
  image: StaticImageData,
  name: string,
  occupation: string,
  testimony: string
}

//This is interface for projects
export interface IProject {
  image: IImage,
  brand: string,
  category: string,
}

///This is the interface for error
export interface IError {
  message?: string,
  cause?: string,
  solution?: string
}

//This is the interface for sheet
export interface ISheetInfo {
  sheetId: string,
  sheetRange: string,
  data: { [key: string]: any }
}

//The enum for OS of client's device
export enum ClientOS {
  MAC_OS = "Mac OS",
  IOS = "iOS",
  ANDROID = "Android",
  WINDOW = "Windows",
  LINUX = "Linux",
  UNKNOWN = "Unknown"
}

//The enum for OS of client's device type
export enum ClientDevice {
  DESKTOP = "Desktop",
  TABLET = "Tablet",
  MOBILE = "Mobile"
}

//Interface for currency
export interface ICurrency {
  name?: string,
  abbreviation?: string,
  symbol?: string,
  exchangeRate?: number //Unit in USD
}

//This is the interface for event research
export interface IEventResearch {
  ID: string,
  EventName: string,
  Data: string,
  Date: string,
  Time: string,
  OS: ClientOS,
  Device: ClientDevice
}

//Interface for country name
export interface ICountryName {
  common?: string,
  official?: string,
  abbreviation?: string,
  demonym?: string,
  capital?: string | Array<string>
}

///Declaring the inteface for the country
export interface ICountry {
    name?: ICountryName,
    states?: Array<{
      name?: string,
      abbreviation?: string,
      counties?: Array<{
        name?: string,
        abbreviation?: string
      }>,
      extraDeliveryPercent: number
    }>,
    stateTitle?: string,
    location?: ICountryLocation,
    dial_code?: string,
    currency?: ICurrency,
    timezones?: Array<string>,
    languages?: Array<{ 
      name?: string, 
      code?: string 
    }>,
    areaCodeTitle?: string, //This is the title for the area code
    independence?: {
      date?: string, //DD-MM-YYYY
      age?: number //Age in years
    },
    gdp?: { //Unit in USD
      total?: number,
      perCapital?: number
    },
    delivery?: {
      feePerKg?: number, //USD per Kg
      baseNumber?: number //Base number to multiply the base fee
    },
    priceInflation?: number, //Price inflation percent
    flag?: IImage
}

/**
 * @notice The interface for client info
 */
export interface IClientInfo {
  _id?: string,
  ipData?: {
    ip?: string,
    city?: string,
    region?: string,
    country?: string
  },
  groupTest?: string,
  countryInfo?: ICountry
}

//Interface for client info store
export interface IClientInfoStore {
  info?: IClientInfo
  setClientInfo: (info: IClientInfo) => void
}