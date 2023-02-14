import React from 'react'
import { BiSlideshow } from 'react-icons/bi';
import { TbMovie } from 'react-icons/tb';

const Categories = () => {
  return (
      <div className='my-10 h-fit sticky'>
        <div className='w-48 px-8 fixed py-4 bg-white ml-6 rounded-md shadow-md shadow-black flex gap-2 items-center'>
            <BiSlideshow />
            <h1>Séries</h1>
        </div>
    </div>
  )
}

export default Categories