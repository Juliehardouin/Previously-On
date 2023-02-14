import React from 'react'
import DisplayShows from '../Components/DisplayShows'
import Categories from '../Components/Categories'

const HomeView = () => {
  return (
    <div className='flex'>
      <Categories />
      <DisplayShows />
    </div>
  )
}

export default HomeView