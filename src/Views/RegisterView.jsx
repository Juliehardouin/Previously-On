import React from 'react'
import RegisterForm from '../Components/Authentification/RegisterForm'

const RegisterView = () => {

    return (
        <div className='bg-gradient-to-r from-[#232526] to-[#414345] h-screen flex justify-center items-center'> 
            <div className="xs:mx-1 sm:mx-12 md:mx-24 lg:mx-64 z-40 h-fit bg-white shadow-lg shadow-black rounded-md">
                <RegisterForm className="z-30" />
            </div>
        </div>
    )
}

export default RegisterView