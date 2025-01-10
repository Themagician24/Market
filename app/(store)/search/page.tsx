
import React from 'react'


export default async function SearchPage({
    searchParams,
}:{
    searchParams: {
        query: string,
        // page: number,
    };

}) {
    const { query } = await searchParams;
  return (
    <div>SearchPage for {query}</div>
  )
}
