"use client"
///Clients Slide component

///Libraries -->
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, MouseEvent, useRef } from 'react';
import styles from "./clients.module.scss"
import { IClientInfo, IButtonResearch } from '@/config/interfaces';
import { routeStyle, clientInfoName, getCurrentDate, getCurrentTime, extractBaseTitle, storeButtonInfo } from '@/config/utils'
import { getItem, getDevice, getOS } from '@/config/clientUtils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image, { StaticImageData } from 'next/image';
import { useModalBackgroundStore, useLoadingModalStore } from '@/config/store';
import { Swiper as SwiperCore } from 'swiper/types';
import { EffectCoverflow, Pagination, Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import client1 from '@/public/images/client1.png';
import client2 from '@/public/images/client2.png';
import client3 from '@/public/images/client3.png';
import client4 from '@/public/images/client4.png';
import client5 from '@/public/images/client5.png';
import client6 from '@/public/images/client6.png';
import client7 from '@/public/images/client7.png';
import client8 from '@/public/images/client8.png';
import client9 from '@/public/images/client9.png';


///Commencing the code 

/**
 * @title Client Slide Component
 * @returns The Client Slide component
 */
const ClientSlide = () => {
    const routerPath = usePathname();
    const router = useRouter();
    //const clientInfo = useClientInfoStore(state => state.info)
    const _clientInfo = getItem(clientInfoName)
    const [clientInfo, setClientInfo] = useState<IClientInfo | undefined>(_clientInfo!)
    const [lastIndex, setLastIndex] = useState(6)
    const [title, setTitle] = useState<string>()
    const [barTitle, setBarTitle] = useState<string>()
    const swiperRef = useRef<SwiperCore | null>(null);
    const setModalBackground = useModalBackgroundStore(state => state.setModalBackground)
    const setLoadingModal = useLoadingModalStore(state => state.setLoadingModal)
    const [mounted, setMounted] = useState(false);
    const clients: Array<StaticImageData> = [
        client1, client2, client3, client4, client5, client6, client7, client8, client9
    ]
        
    //For client rendering
    useEffect(() => {
        setMounted(true);
    }, []);

    //console.log("Path: ", routerPath)
    //Updating client info
    useEffect(() => {
        //console.log("Hero: ", _clientInfo, clientInfo)

        let _clientInfo_
        
        if (!clientInfo) {
            //console.log("Client info not detected")
            const interval = setInterval(() => {
                _clientInfo_ = getItem(clientInfoName)
                //console.log("Delivery Info: ", _deliveryInfo)
                setClientInfo(_clientInfo_)
            }, 100);
    
            //console.log("Delivery Info: ", deliveryInfo)
        
            return () => {
                clearInterval(interval);
            };
        } else {
            setModalBackground(false)
            setLoadingModal(false)
            //console.log("Client info detected")
        }  

    }, [clientInfo])

    useEffect(() => {
      const intervalId = setInterval(() => {
        if (screen.width < 600) {
          setLastIndex(3)
        } else if (600 < screen.width && screen.width < 1000) {
          setLastIndex(5)
        } else {
          setLastIndex(6)
        }
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [lastIndex, title]);

    //This is trigerred when the user clicks on a direction arrow
    const clickArrow = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, direction: string) => {
      e.preventDefault();

      if (direction === "prev") {
        swiperRef.current?.slidePrev()
      } else {
        swiperRef.current?.slideNext()
      }

      //Storing this info in button research
      const info: IButtonResearch = {
          ID: clientInfo?._id!,
          IP: clientInfo?.ipData?.ip!,
          City: clientInfo?.ipData?.city!,
          Region: clientInfo?.ipData?.region!,
          Country: clientInfo?.ipData?.country!,
          Button_Name: "clickArrow()",
          Button_Info: `Clicked direction arrow ${direction} in clients section`,
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
      <main className={`${styles.main} ${routeStyle(routerPath, styles)}`}>
        <div className={styles.container}>
          <div className={styles.heading}>
            <div className={styles.upper}>
                <div className={styles.bar}></div>
                <span className={styles.barTitle}>Clients</span>
            </div>
            <div className={styles.lower}>
                <span className={styles.subheading}>Meet some companies we are working with</span>
                <div className={styles.controller}>
                    <button className={`arrow-left arrow ${styles.prev}`} onClick={(e) => clickArrow(e, "prev")}>
                      <ArrowBack className={styles.icon} />
                    </button>
                    {/* <div className={`swiper-pagination ${styles.pagination}`}></div> */}
                    <button className={`arrow-right arrow ${styles.next}`} onClick={(e) => clickArrow(e, "next")}>
                      <ArrowForward className={styles.icon} />
                    </button>
                </div>
            </div>
          </div>
          <br />
          <Swiper
              effect={'slide'}
              spaceBetween={10}
              grabCursor={true}
              centeredSlides={false}
              loop={true}
              autoplay={{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true }} //{{ delay: 7000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              slidesPerView={'auto'}
              onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                  }}
              coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
              }}
              fadeEffect={{ crossFade: true }}
              pagination={{ el: '.swiper-pagination', clickable: true }}
              //navigation={{ nextEl: nextRef.current, prevEl: prevRef.current }}
              modules={[ EffectCoverflow, Pagination, Navigation, Autoplay, EffectFade ]}
              className={styles.swipeContainer}
          >
              {mounted ? clients?.map((client, id) => (
                  <SwiperSlide className={styles.slider} key={id}>
                      <div className={styles.image}>
                        <Image
                            className={styles.img}
                            src={client.src!}
                            alt=""
                            width={client.width!}
                            height={client.height!}
                        /> 
                      </div>
                  </SwiperSlide>
              )) : (
                <></>
              )}
          </Swiper>
        </div>
      </main>
    );
};
  
export default ClientSlide;