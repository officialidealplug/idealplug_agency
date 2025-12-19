///This refers to the sitemap configurations

///Libraries -->
import { MetadataRoute } from 'next'
import { domainName } from '@/config/utils'
 
///Commencing code -->
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  return [
    {
      url: domainName,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    }
  ]
}