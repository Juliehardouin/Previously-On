import React from 'react'
import { RiLogoutCircleRLine } from 'react-icons/ri';


const DisconnectButton = () => {

    function removeToken() {
        localStorage.clear()
        window.location.href = "/"
    }
    
    return (
        <div className="self-center cursor-pointer hover:scale-110 transition-200 duration-300" onClick={removeToken}>
            <a href=""><RiLogoutCircleRLine size={27} /></a>
        </div>    
    )
}

export default DisconnectButton