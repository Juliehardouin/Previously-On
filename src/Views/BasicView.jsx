import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Global/Header'
import Footer from '../Components/Global/Footer'


const BasicView = () => {
  return (
    <div className=''>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
// from-[#232526] to-[#414345]
export default BasicView