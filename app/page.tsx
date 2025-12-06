"use Client"

///This handles the home page

///Libraries -->
import Hero from "@/components/hero/Hero"
import AboutUs from "@/components/aboutUs/AboutUs"
import ClientSlide from "@/components/clients/Clients"
import ServiceSlide from "@/components/services/Services"
import ProjectSlide from "@/components/projects/Projects"
import TestimonialSlide from "@/components/testimonial/Testimonial"
import Hire from "@/components/hire/Hire"
import Footer from "@/components/footer/Footer"
import ContactModal from "@/components/modals/contactModal/ContactModal"

//Commencing the code -->
/**
 * @title Homepage
 */
export default async function Home() {
 
  return (
    <main className="home_page" >
      <Hero />
      <AboutUs />
      <ClientSlide />
      <ServiceSlide />
      <ProjectSlide />
      <TestimonialSlide />
      <Hire />
      <Footer />
      {/* <ContactModal /> */}
    </main>
  )
}
