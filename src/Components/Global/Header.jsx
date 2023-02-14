import React from 'react'
import { Link } from 'react-router-dom';
import DisconnectButton from './DisconnectButton'
import { AiOutlineHome } from 'react-icons/ai';



const Header = () => {

    return(
      <div className="shadow-md h-20 z-50 sticky top-0 py-8 bg-black/50 text-white flex px-16 backdrop-blur-lg bg-[#202020]">

        <div className="flex-1 self-center font-bold font-['Impact'] text-2xl text-left hover:text-orange-400">
          <Link to="/Home">
            <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt="logo de previously on" className='w-1/3 hover:scale-110 transition-200 duration-200' />
          </Link>
        </div>

        <div className='flex flex-1 justify-end gap-2'>
          <Link to="/Home" className='self-center bg-transparent p-2 hover:scale-110 transition-200 duration-300'>
            <AiOutlineHome size={30} color={"white"} />
          </Link>
          <Link to="/Mes-Series" className='border border-white hover:bg-white text-white hover:text-black text-white transition-200 duration-300 p-3 transition-200 duration-300 self-center'>
            <button>Mes séries</button>
          </Link>
          <DisconnectButton />
        </div>
      </div>
    )
}

export default Header