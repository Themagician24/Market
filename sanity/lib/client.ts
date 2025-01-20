import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, 
  stega:{
    studioUrl: process.env.VERCEL_URL
     ? `https://${process.env.VERCEL_URL}/studio`
     : `${process.env.NEXT_PUBLICBASE_URL}
     /studio`
  }// Set to false if statically generating pages, using ISR or tag-based revalidation
})
