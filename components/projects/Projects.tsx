"use client"
///Projects Slide component

///Libraries -->
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, MouseEvent, useRef } from 'react';
import styles from "./projects.module.scss"
import { IImage, IButtonResearch, IClientInfo, IProject } from '@/config/interfaces';
import { routeStyle, storeButtonInfo, extractBaseTitle, getCurrentDate, getCurrentTime, clientInfoName } from '@/config/utils'
import { getDevice, getItem, setItem, getOS } from '@/config/clientUtils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image, { StaticImageData } from 'next/image';
import { useModalBackgroundStore, useLoadingModalStore, useClientInfoStore } from '@/config/store';
import { Swiper as SwiperCore } from 'swiper/types';
import { EffectCoverflow, Pagination, Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { ArrowBack, ArrowForward,  } from '@mui/icons-material';
import project1 from '@/public/images/project_1.webp';
import project2 from '@/public/images/project_2.webp';
import project3 from '@/public/images/project_3.webp';
import project4 from '@/public/images/project_4.webp';
import project5 from '@/public/images/project_5.webp';
import project6 from '@/public/images/project_6.webp';
import project7 from '@/public/images/project_7.webp';
import project8 from '@/public/images/project_8.webp';
import project9 from '@/public/images/project_9.webp';
import project10 from '@/public/images/project_10.webp';
import project11 from '@/public/images/project_11.webp';
import project12 from '@/public/images/project_12.webp';

///Commencing the code 

/**
 * @title Project Slide Component
 * @returns The Project Slide component
 */
const ProjectSlide = () => {
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

    //This contains the list of all projects
    const projects: Array<IProject> = [
        { image: project1, brand: "Horizon Estate", category: "UI/UX Design & Web Development" },
        { image: project2, brand: "Fiti", category: "UI/UX Design & Mobile App" },
        { image: project3, brand: "Hetar", category: "UI/UX Design & Web Development" },
        { image: project6, brand: "PrepHero", category: "Graphic Design" },
        { image: project7, brand: "Vegi", category: "UI/UX Design & Web Development" },
        { image: project4, brand: "Healthink", category: "UI/UX Design" },
        { image: project12, brand: "Stella", category: "UI/UX Design & Web Development" },
        { image: project8, brand: "PanPan", category: "Graphic Design" },
        { image: project10, brand: "Banklio", category: "UI/UX Design & Web Development" },
        { image: project11, brand: "Nitec", category: "UI/UX Design & Web Development" },
        { image: project5, brand: "Healium", category: "UI/UX Design & Web Development" },
        { image: project9, brand: "Roam Supply", category: "Graphic Design" },
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
          Button_Info: `Clicked direction arrow ${direction} in projects section`,
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
      <main className={`${styles.main} ${routeStyle(routerPath, styles)}`} id="projects">
        <div className={styles.container}>
          <div className={styles.heading}>
            <div className={styles.upper}>
                <span className={styles.barTitle}>Projects</span>
            </div>
            <div className={styles.lower}>
                <span className={styles.subheading}>Some of our works</span>
            </div>
          </div>
          <br />
          <Swiper
              effect={'coverflow'}
              spaceBetween={10}
              grabCursor={true}
              centeredSlides={true}
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
              {mounted ? projects?.map((project, id) => (
                  <SwiperSlide className={styles.slider} key={id}>
                      <div className={styles.imageDiv}>
                        <Image
                            className={styles.img}
                            src={project.image.src!}
                            alt=""
                            width={project.image.width!}
                            height={project.image.height!}
                        /> 
                      </div>
                      <div className={styles.title}>{project.brand}</div>
                      <div className={styles.text}>{project.category}</div>
                  </SwiperSlide>
              )) : (
                <></>
              )}
          </Swiper>
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
      </main>
    );
};
  
export default ProjectSlide;