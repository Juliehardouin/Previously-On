import React, { useState, useEffect } from 'react'
import Input from '../Global/Input'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../API';
import md5 from 'md5';

const RegisterForm = () => {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function postUser(event) {

      event.preventDefault()
      fetch('https://api.betaseries.com/members/auth', {

        method: 'POST',
        headers: {
          "Content-Type" : "application/json",
          "Accept" : "application/json",
          "X-BetaSeries-Key" : "e86576ff8701",
        },
        body: JSON.stringify({
          login: email,
          password: md5(password),
        })
      }).then((reponse) => {  
          if (reponse.status == 200) {
          return reponse.json();
        } else {
          toast.error("Les identifiants sont incorrects")
        }})
        .then((json) => {
          localStorage.setItem("token", (json['token']))
          window.location.href = "/home"
      })
    }
    
    return (
      <div className=''>
        <div className="flex w-full">
        <ToastContainer />
        <img src={process.env.PUBLIC_URL + '/assets/logo.png'} alt="logo de previously on" className='w-1/2 hover:scale-110 transition-200 duration-200' />
          <h2 className="text-xl font-extrabold uppercase bg-[#202020] text-white p-8 shadow-md shadow rounded-md rounded-tl-none rounded-br-none w-full self-auto">MON COMPTE <strong>BETASERIES</strong></h2>
        </div>
        <div className='shadow-lg p-16 m-auto'>
        <form onSubmit={postUser}>
          <label>
              <p className='text-left'>Email</p>
              <input type='text' name="email" className="shadow-form-text-auth my-2 bg-neutral-100 p-2 w-full shadow-form-text" onChange={e => setEmail(e.target.value)} required />
          </label>
          <label className='text-left'>
              <p>Mot de passe</p>
              <Input type='password' name="password" className="shadow-form-text-auth my-2 bg-neutral-100 p-2 w-full shadow-form-text text-black" onChange={e => setPassword(e.target.value)} required />
          </label>
          <div className="w-full">
            <button className='bg-[#202020] text-white p-4 mt-8 rounded-sm hover:text-bold hover:px-20 hover:bg-green-600 transition-300 ease-in transition-all hover:scale-105 duration-300'>
              JE ME CONNECTE 
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm