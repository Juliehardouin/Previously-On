import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { AiOutlineDelete } from 'react-icons/ai';
import { ThreeDots } from 'react-loading-icons'

const MyShows = () => {

    const APIToken = "https://api.betaseries.com/shows/member"
    const APIDelete = "https://api.betaseries.com/shows/show"
    const token = localStorage.getItem("token")
    const [shows, setShows] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect( () => {
        fetch(APIToken, {
        method: 'GET',
        headers: {
            "Content-type" : "application/json",
            "Accept" : "application/json",
            "X-BetaSeries-Key" : "e86576ff8701",
            "Authorization" : `Bearer ${token}`
        }
        }).then((response) => response.json())
        .then((json) => {
          setShows(json.shows)
          setLoading(true)
        })
    },[])
  
    function DeleteShow(id, e) {
        fetch(APIDelete, {
        method: 'DELETE',
        headers: {
            "Content-type" : "application/json",
            "Accept" : "application/json",
            "X-BetaSeries-Key" : "e86576ff8701",
            "Authorization" : `Bearer ${token}`
        },
          body: JSON.stringify({ id })
        }).then((response) => response.json())
        .then((json) => {
          setShows(state => { 
            return state.filter(( show ) => { // au lieu de modifier, renvoie true ou false, si true : garde dans le tableau, sinon l'enlève
              return !( show.id == json.show.id) // ! sinon supprime tout sauf
              // si le show reçu est le show sur lequel on a cliqué, 
              // si c'est vrai, renvoie false, sinon renvoie true
              })
          })
        }
        )
    }


    return(
        <div className='bg-gradient-to-r from-[#232526] to-[#414345] h-screen'>
          { loading ? 
          <div className='flex'>
            <div className='flex flex-wrap justify-center flex-auto'> 
              {
                shows ?
                shows.map(
                    (Vignette, index) => (
                      
                      <div className='lg:w-52 md:w-48 flex p-4 shadow-neutral-500 mt-4'>
                        <div className='transition-200 duration-300 hover:scale-110 group'>
                          <Link to={'/ShowDetails/' + Vignette.id}>
                            <img src={Vignette.images.poster !== null ? Vignette.images.poster : "https://lumiere-a.akamaihd.net/v1/images/image_7338a114.jpeg?region=0,0,540,810&width=480"} className='rounded-md' />
                          </Link>
                          <h1 key={index} className='mt-1 text-sm text-white font-bold text-md text-ellipsis bg-[#202020] p-1 rounded-md'>{Vignette.title}</h1>
                          <div className='flex group-hover:block hidden flex absolute top-0 right-0 rounded-md bg-red-600 text-sm hover:bg-red-500 p-2 transition-400 duration-300 active:bg-yellow-300' onClick={(e) => DeleteShow(Vignette.id, e)}>
                            <button><AiOutlineDelete size={30} color={"white"} /></button>
                          </div>
                        </div>
                      </div>
    
                    )
                  
              ) : null
            }
            </div>
          </div>
        : 
        <div className='h-screen w-full flex justify-center align-center'>
            <ThreeDots className='self-center' />
        </div> }
        </div>
      )
}

export default MyShows