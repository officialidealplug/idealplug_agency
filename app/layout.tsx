///Layout page

///Libraries -->
import { domainName, companyName } from '@/config/utils';
import Layout from "@/components/layout/Layout";
//import dynamic from "next/dynamic";
//const Layout = dynamic(() => import("@/components/layout/Layout"), { ssr: false })

///Commencing the code

///Declaring the metadata
//console.log('Domain Name: ', domainName)
export const metadata = {
  metadataBase: new URL(domainName), 
  title: {
    default: `${companyName} - Agency`,
    template: `%s | ${companyName} - Agency`
  },
  icons: {
    icon: '/favicon.ico',
  },
  description: 'We are your ideal solution for your everyday internet services.',
  keywords: [
    'idealplug',
    'ecommerce',
    'internet services',
    'web development',
    'UI/UX design',
    'hosting',
    'domain registration',
    'website design',
    'digital marketing',
    'SEO services',
    'online solutions',
    'tech services'
  ],
}


///Handles the root layout of the page
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <Layout>
      {children}
    </Layout>
  )
}
