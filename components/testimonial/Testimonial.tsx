"use client"
///Testimonials Slide component

///Libraries -->
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, MouseEvent, useRef } from 'react';
import styles from "./testimonial.module.scss"
import { IClientInfo, ITestimonial, IButtonResearch } from '@/config/interfaces';
import { routeStyle, clientInfoName, storeButtonInfo, getCurrentDate, getCurrentTime, extractBaseTitle } from '@/config/utils'
import { getItem, getDevice, getOS } from '@/config/clientUtils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FormatQuote } from '@mui/icons-material';
import Image, { StaticImageData } from 'next/image';
import { useModalBackgroundStore, useLoadingModalStore } from '@/config/store';
import { Swiper as SwiperCore } from 'swiper/types';
import { EffectCoverflow, Pagination, Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import thomas_grant from '@/public/images/Thomas_Grant.jpg';
import rita_adewale from '@/public/images/Rita_Adewale.jpg';
import michael_kim from '@/public/images/Michael_Kim.jpg';
import elena_vargas from '@/public/images/Elena_Vargas.jpg';
import sarah_mitchell from '@/public/images/Sarah_Mitchell.jpg';
import daniel_roberts from '@/public/images/Daniel_Roberts.jpg';
import jasmine_owon from '@/public/images/Jasmine_Owon.jpg';
import jonathan_hayes from '@/public/images/Jonathan_Hayes.jpg';
import melissa_tran from '@/public/images/Melissa_Tran.jpg';
import kelechi_okafor from '@/public/images/Kelechi_Okafor.jpg';
import ava_thompson from '@/public/images/Ava_Thompson.jpg';
import marco_santini from '@/public/images/Marco_Santini.jpg';
import samantha_ortiz from '@/public/images/Samantha_Ortiz.jpg';
import michael_reeves from '@/public/images/Michael_Reeves.jpg';
import lucy_coleman from '@/public/images/Lucy_Coleman.jpg';
import daniel_harper from '@/public/images/Daniel_Harper.jpg';


///Commencing the code 

/**
 * @title Testimonial Slide Component
 * @returns The Testimonial Slide component
 */
const TestimonialSlide = () => {
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
    const testimonials: Array<ITestimonial> = [
        {
          image: sarah_mitchell,
          name: "Sarah Mitchell",
          occupation: "Marketing Director, NovaTech",
          testimony: "Working with this team was an incredible experience. They rebuilt our website with a strong focus on performance & responsiveness. The result was visually appealing which significantly improved the way customers interacted with our brand. Their ability translated our goals into clean functionality"
        },
        {
          image: daniel_roberts,
          name: "Daniel Roberts",
          occupation: "Founder, BrightPath Coaching",
          testimony: "Their team delivered a well-structured, easy-to-navigate website that has transformed how clients interact with my services. Beyond development, they refined my brand visuals to feel more professional. This blend of clean design and strong technical execution has made a noticeable impact on my overall client engagement."
        },
        {
          image: elena_vargas,
          name: "Elena Vargas",
          occupation: "Product Manager, Finex Solutions",
          testimony: "This agency took our outdated platform and rebuilt it into an intuitive, and scalable digital product. Their UI/UX improvements alone made a huge difference in our user onboarding and retention rates. They also advised us on digital marketing strategies that boosted our early-stage campaign performance."
        },
        {
          image: michael_kim,
          name: "Michael Kim",
          occupation: "CEO, UrbanMove Logistics",
          testimony: "Our logistics system was scattered and inefficient until this team stepped in. They developed a custom website that streamlined our internal processes and provided a centralized dashboard. The site now runs smoothly & our customer satisfaction rates have gone up since launch. Their technical expertise were evident from day one."
        },
        {
          image: jasmine_owon,
          name: "Jasmine Owon",
          occupation: "Creative Lead, PixelWave Studio",
          testimony: "Their design team delivered branding assets that elevated the entire look and feel of our studio. The graphics were sharp, cohesive, and aligned perfectly with the modern aesthetic we wanted. They even optimized the visuals for our new portfolio website, creating a seamless digital presence that stands out beautifully."
        },
        {
          image: thomas_grant,
          name: "Thomas Grant",
          occupation: "Operations Manager, EcoBuild",
          testimony: "The website they built for us simplified how we showcase our projects and communicate with clients. It's fast, secure, and incredibly easy for our team to manage. Their structured approach to development and ability to break down technical decisions made the collaboration stress-free and efficient."
        },
        {
          image: rita_adewale,
          name: "Rita Adewale",
          occupation: "Entrepreneur",
          testimony: "They brought my business vision to life with a polished website that reflects exactly what my brand stands for. Every section was carefully thought out & the interface feels natural for users. They also helped refine my brand identity with clean, modern graphic elements that have made my business look more professional"
        },
        {
          image: jonathan_hayes,
          name: "Jonathan Hayes",
          occupation: "Director of Sales, ClarityHealth",
          testimony: "The team understood our industry challenges and developed a website that communicates trust, clarity, and professionalism. The redesign improved our lead conversion rates almost immediately. They also provided digital marketing insights that helped streamline our outreach campaigns and boost engagement."
        },
        {
          image: melissa_tran,
          name: "Melissa Tran",
          occupation: "E-commerce Owner",
          testimony: "My online store has never looked or performed better. They rebuilt the website with a strong focus on speed, checkout flow & mobile responsiveness. Sales increased within weeks & customers consistently mention how easy it is to navigate the site. They also helped optimize product visuals, which made it more appealing."
        },
        {
          image: kelechi_okafor,
          name: "Kelechi Okafor",
          occupation: "Startup Founder",
          testimony: "As a startup, we needed a product that was scalable & visually compelling. This agency delivered exactly that and more. They guided us through user research, branding & platform development with a clear, strategic approach. Their digital marketing recommendations also helped us gain early traction"
        },
        {
          image: ava_thompson,
          name: "Ava Thompson",
          occupation: "Brand Strategist",
          testimony: "Their team knows how to merge creativity with functionality. The website they built for our brand is not only visually striking but also structured perfectly for our content strategy. They also redesigned our visual identity, giving us clean and modern graphics that strengthened our overall brand presence."
        },
        {
          image: marco_santini,
          name: "Marco Santini",
          occupation: "Real Estate Consultant",
          testimony: "They created a platform that made managing and showcasing property listings incredibly easy. The new design is clean, professional, and highly optimized for mobile users. They also offered digital marketing assistance that helped increase organic inquiries and improve lead quality across my campaigns."
        },
        {
          image: samantha_ortiz,
          name: "Samantha Ortiz",
          occupation: "Fashion Designer",
          testimony: "This agency transformed the way my brand shows up online. They took time to understand my aesthetic, my audience, and my goals. Within weeks, our engagement skyrocketed, collaborations increased, and my brand finally felt aligned with the creative vision I've been chasing for years."
        },
        {
          image: michael_reeves,
          name: "Michael Reeves",
          occupation: "Event Planner",
          testimony: "Working with this agency has been one of the best decisions for my business. They built a marketing strategy that not only attracted more clients but also positioned my services as premium. The attention to detail, communication, and follow-through were above and beyond anything I expected."
        },
        {
          image: lucy_coleman,
          name: "Lucy Coleman",
          occupation: "Restaurant Owner",
          testimony: "Absolutely outstanding service from start to finish. They created a strong digital presence for our restaurant and helped us stand out in a competitive market. Thanks to their targeted campaigns and branding support, we saw a noticeable increase in reservations and returning customers."
        },
        {
          image: daniel_harper,
          name: "Daniel Harper",
          occupation: "Fitness Trainer",
          testimony: "The expertise this agency brings is on another level. They helped me sharpen my brand message and launch a campaign that boosted my client bookings more than I thought possible. Their consistent communication and strategic guidance made the entire process smooth and incredibly effective."
        }
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
          Button_Info: `Clicked direction arrow ${direction} in testimonial section`,
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
                <span className={styles.barTitle}>Testimonials</span>
            </div>
            <div className={styles.lower}>
                <span className={styles.subheading}>Why customers love working with us</span>
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
              autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }} //{{ delay: 7000, disableOnInteraction: false, pauseOnMouseEnter: true }}
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
              {mounted ? testimonials?.map((testimonial, id) => (
                  <SwiperSlide className={styles.slider} key={id}>
                    <div className={styles.testimony}>
                      <FormatQuote className={styles.openQuote} />
                      {testimonial.testimony}
                      <FormatQuote className={styles.closeQuote} />
                    </div>
                    <div className={styles.bio}>
                      <div className={styles.image}>
                        <Image
                            className={styles.img}
                            src={testimonial.image.src!}
                            alt=""
                            width={testimonial.image.width!}
                            height={testimonial.image.height!}
                        /> 
                      </div>
                      <div className={styles.text}>
                        <div className={styles.text1}>{testimonial.name}</div>
                        <div className={styles.text2}>{testimonial.occupation}</div>
                      </div>
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
  
export default TestimonialSlide;