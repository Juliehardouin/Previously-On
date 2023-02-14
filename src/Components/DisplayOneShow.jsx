import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MdOutlineStar } from 'react-icons/md'
import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";

const DisplayOneShow = function(){
    
    let { id } = useParams();
    const token = localStorage.getItem("token")
    const APIModulable = { }

    const APISdisplayShow=`https://api.betaseries.com/shows/display?id=${id}`
    const APISdisplaySeason=`https://api.betaseries.com/shows/seasons?id=${id}`
    const APIdisplaySeen ="https://api.betaseries.com/episodes/watched?bulk=false"
    const APIdeleteSeen =`https://api.betaseries.com/episodes/watched`
    const APIMultipleEpSeen = "https://api.betaseries.com/episodes/watched"
    
    const [OneShow, setOneShow] = useState({})
    const [NbSeason, setNbSeason] = useState([])
    const [NbEpisode, setNbEpisode] = useState([])
    const [Genres, setGenres] = useState([]);
    const [active, setActive] = useState(false)
    const [activeSeason, setActiveSeason] = useState(false)
    const [activeEpisode, setActiveEpisode] = useState("")
    const [Episodes, setEpisodes] = useState(false)
    const [FindGenre, setFindGenre] = useState([])
    
    
    // Afficher le nombre de saison et nombre d'épisodes par saison
    
    useEffect( () => {
        fetch(APISdisplayShow, {
            method: 'GET',
            headers: {
                "Content-type" : "application/json",
                "Accept" : "application/json",
                "X-BetaSeries-Key" : "e86576ff8701",
            }
        }).then((response) => response.json())
        .then((json) => {
            setOneShow(json.show)
            setFindGenre(Object.keys(json.show.genres))
            setNbSeason(json.show.seasons_details)
            setNbEpisode(json.show.seasons_details.episodes)
            setGenres(json.show.genres)
        })
    },[])

    
    // afficher la couverture des series
    
    useEffect( () => {
        fetch(APISdisplaySeason, {
            method: 'GET',
            headers: {
                "Content-type" : "application/json",
                "Accept" : "application/json",
                "X-BetaSeries-Key" : "e86576ff8701",
            }
        }).then((response) => response.json())
        .then((json) => {
            
        })
    },[])
    
    // marquer un épisode comme vu 
    
    function Seen(EpID) {
        fetch(APIdisplaySeen, {
            method: 'POST',
            headers: {
                "Content-type" : "application/json",
                "Accept" : "application/json",
                "X-BetaSeries-Key" : "e86576ff8701",
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify({ id:EpID })
        }).then((response) => response.json())
        .then((json) => {
            setEpisodes(state => { 
               return state.map((episodes) => {
                    if (episodes.id == json.episode.id) {
                        return json.episode
                    }
                    return episodes
                })
             })
        })
    }

    // marque un épisode plus les précédents en vu 

    function PrecSeen(EpID) {
        fetch(APIMultipleEpSeen, {
            method: 'POST',
            headers: {
                "Content-type" : "application/json",
                "Accept" : "application/json",
                "X-BetaSeries-Key" : "e86576ff8701",
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify({ id:EpID })
        }).then((response) => response.json())
        
    }



    // marquer un episode comme non vu 

    function Unseen(EpID) {
        fetch(APIdeleteSeen, {
            method: 'DELETE',
            headers: {
                "Content-type" : "application/json",
                "Accept" : "application/json",
                "X-BetaSeries-Key" : "e86576ff8701",
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify({ id:EpID })
        }).then((response) => response.json())
        .then((json) => {
            setEpisodes(state => { 
               return state.map((episode) => {
                    if (episode.id == json.episode.id) {
                        return json.episode
                    }
                    return episode
                })
             })
        })
        // console.log(activeEpisode)
    }


// Afficher les épisodes, par saison

    useEffect( () => {

        if(active) {
            
        fetch(`https://api.betaseries.com/shows/episodes?id=${id}&season=${active}`, {
            method: 'GET',
            headers: {
                "Content-type" : "application/json",
                "Accept" : "application/json",
                "X-BetaSeries-Key" : "e86576ff8701",
                "Authorization" : `Bearer ${token}`
            }
        }).then((response) => response.json())
        .then((json) => {
            setEpisodes(json.episodes)
        })
    }
    },[active])
    

    function Select(id) {
        setActive(id);
    }


  return (
    <div className='text-white bg-gradient-to-r from-[#232526] to-[#414345] w-full'>
        <div className='w-full'>
            <div className='bandeau relative flex-col flex md:flex-row items-center border-black'>
                    <img className='w-full absolute left-0 h-full blur-md' src={OneShow.images?.poster} alt="" />
                <div className='z-10 w-2/5 flex justify-center'>
                    <img className='w-64 shadow-lg shadow-black' src={OneShow.images?.poster} alt="" />
                </div>

                <div className='infoSerie z-10 w-3/5 h-96 mr-12 bg-[#2f2f2fbe] shadow-lg shadow-black p-12 m-12 overflow-scroll'>
                    <h1 className='w-full mb-4 text-white font-bold text-center pb-3 text-3xl'>{OneShow.title}</h1>
                        <div className='flex flex-row'>
                            <div className='partOne border-r border-white pr-8 w-3/5'>
                                <p className='text-gray-300 p-3'>{OneShow.description}</p>
                            </div>
                            <div className='partTwo w-3/5 ml-8 flex flex-col'>
                                <p className='pb-4'>{OneShow.seasons} saison(s) - {OneShow.episodes} épisode(s)</p>
                                <p className='pr-2 w-full font-bold'>Genre : </p>
                                <div>
                                    <div className='flex flex-wrap justify-center'> 
                                        {
                                            FindGenre.map(
                                                (type) => (
                                                        <p className='pr-2'>{type}, </p>
                                                ))
                                        }
                                    </div>
                                </div>
                                <p className='pt-4'>Sortie en {OneShow.creation}</p>

                                <p className='pt-4 p-1'>Votes : {OneShow.notes?.total}</p>
                                <div className='flex items-center justify-center'>
                                    <MdOutlineStar color={"yellow"} size={22}/> 
                                    <p className='pt-4 px-2'>Note : {Math.round(OneShow.notes?.mean)} / Suggéré par {OneShow.notes?.user} utilisateur(s)</p>
                                </div>
                            </div>
                        </div>
                </div>
            </div>

            <div className='z-10 md:flex w-auto'>
                <div className='p-8 bg-[#3a3939be] rounded-sm shadow-black shadow-xl w-full md:justify-center'>
                    <div className="w-5/6 mx-auto pointer">
                        { NbSeason.map((nb) => (
                            <div onClick={() => setActive(nb.number)} className="flex justify-between my-2 p-2 border border-transparent hover:border hover:border-white shadow shadow-black" >
                                <p className="text-xl text-left">Saison {nb.number}</p>
                                <p id="test" className="text-slate-400 text-xl">{nb.episodes} épisodes</p>
                            </div>
                        ))}
                    </div>
                    
                    <div className='flex flex-col items-center'> 
                        {Episodes && Episodes.map((soloEpisode) => (
                            <div className='flex flex-col items-center md:flex-row md:max-w-4xl'>
                                <div className=' md:items-center md:flex md:flex-col relative'>
                                    <img src={`https://api.betaseries.com/pictures/episodes?id=${soloEpisode.id}&key=e86576ff8701`} alt="image épisode série" className='w-full align-center shadow-md shadow-black md:mt-4 md:mb-8'/>
                                    <p className='py-1 pt-4 font-bold text-xl absolute bottom-4 bg-[#000000a6] w-full'>S{soloEpisode.season} : E{soloEpisode.episode}</p>
                                </div>
                                <div className='md:w-5/6 h-60 md:p-none md:bg-[#202020] md:p-4 md:my-4 overflow-scroll relative'>
                                    <p className='font-bold text-xl pt-2'>{soloEpisode.title}</p>

                                    { 
                                    soloEpisode.user.seen ?
                                    <div className='absolute top-0 right-0 flex bg-black items-center ml-2 text-sm group hover:shadow hover:shadow-lg'>
                                        <button className='text-black p-3 w-fit mx-auto' onClick={() => Unseen(soloEpisode.id)}>
                                            <ImCheckboxChecked size={30} color={"white"} />
                                        </button>
                                    </div>
                                    :
                                    <div className='absolute top-0 right-0 group flex'>
                                        <button className='p-4 hidden group-hover:block transition-200 duration-300 border border-white bg-neutral-200 hover:bg-neutral-300 text-black border border-black hover:text-white hover:bg-black font-bold group' 
                                        onClick={() => PrecSeen(soloEpisode.id)}>
                                            Marquer cet épisode et les précédents comme vus
                                        </button>
                                        <button className='text-black p-4 w-fit mx-auto' onClick={() => Seen(soloEpisode.id)}>
                                            <ImCheckboxUnchecked size={30} color={"white"} />
                                        </button>
                                    </div>
                                    }
                                    
                                    <p className='text-gray-300 p-1 md:text-slate-400'>"{soloEpisode.description}"</p>
                                    <p className='p-1'>Sortie : {soloEpisode.date}</p>
                                    <p className='w-full pt-1 pb-4 border-b border-b-gray-100 md:border-none'>Avis du public : {Math.round(soloEpisode.note?.moyenne)} / 5</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </div>
        <div className='section'>
        </div>
    </div>
  )
}

export default DisplayOneShow