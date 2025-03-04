import React from 'react'
import { useState } from 'react'

const Search = ({search, setSearch}) => {
  return (
    <div className='bg-[#0F0D23] flex items-center p-4 gap-[10px] mx-8 mt-3 rounded-lg justify-center md:mt-8 sm:mx-30 lg:mx-60'>
      <img src="/search.png" alt="search logo" />
      <input className='font-normal text-[#A8B5DB] w-full outline-none border-none' type="text" placeholder='Search through 300+ movies online' value={search} onChange={(e)=>setSearch(e.target.value)} />
    </div>
  )
}

export default Search
