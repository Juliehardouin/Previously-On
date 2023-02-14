import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { IoAddCircleSharp } from 'react-icons/io5';
import { ThreeDots } from 'react-loading-icons'

const APIshows = "https://api.betaseries.com/shows/list?order=popularity"
const APIAddShow = `https://api.betaseries.com/shows/show`

const DisplayShows = function(){

  const token = localStorage.getItem("token")
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(false)
    
  useEffect( () => {
    fetch(APIshows, {
      method: 'GET',
      headers: {
        "Content-type" : "application/json",
        "Accept" : "application/json",
        "X-BetaSeries-Key" : "e86576ff8701",
        "Authorization" : `Bearer `
      }
    }).then((response) => response.json())
    .then((json) => {
      setShows(json.shows)
      setLoading(true)
    })
  },[])
  
 
  function add(id, e) {
    e.stopPropagation()
    // alert(id)
    fetch(APIAddShow, {
      method: 'POST',
      headers: {
        "Content-type" : "application/json",
        "Accept" : "application/json",
        "X-BetaSeries-Key" : "e86576ff8701",
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({ id })
    }).then((response) => response.json())
    console.log(setShows)
  }

  return(
    <div className='bg-gradient-to-r from-[#232526] to-[#414345] min-h-screen min-w-full pl-6'>
      { loading ? 
      <div className='flex ml-48'>
        <div className='flex flex-wrap justify-center flex-auto'> 
          {
            shows ?
            shows.map(
                (Vignette, index) => (
                                  <div className='lg:w-48 md:w-52 flex p-4 shadow-neutral-500'>
                                    <div className='transition-200 duration-300 hover:scale-110 group relative'>
                                      <Link to={'/ShowDetails/' + Vignette.id}>
                                        <img src={Vignette.images.poster !== null ? Vignette.images.poster : "https://lumiere-a.akamaihd.net/v1/images/image_7338a114.jpeg?region=0,0,540,810&width=480"} className='rounded-md' />
                                      </Link>
                                      <h1 key={index} className='mt-2 text-sm text-white text-md'>{Vignette.title}</h1>
                                      <div className='flex group-hover:block hidden flex absolute top-0 right-0 shadow-md shadow-black rounded-sm bg-neutral-200 text-sm hover:bg-green-500 transition-400 duration-300 active:bg-yellow-300' onClick={(e) => add(Vignette.id, e)}>
                                        <button><IoAddCircleSharp size={35} /></button>
                                      </div>
                                    </div>
                                  </div>
                )
            ): null
          }
        </div>
      </div>
      : 
      <div className='h-screen w-full flex justify-center align-center'>
        <ThreeDots  className='self-center' />
      </div> }
    </div>
  )
}

export default DisplayShows
