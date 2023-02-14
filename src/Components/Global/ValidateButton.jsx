import React from 'react';
import { Link } from 'react-router-dom';

export default function ValidateButton(props){

    return(
        <div>
            <Link to="/Home">
                <div className="my-4 hover:text-yellow-300 bg-[#776E6E] text-white py-4 text-center w-full text-md lg:text-base max-lg:mt-4 ease-in duration-100">
                    <button type="submit" className="font-extrabold">{props.text}</button>
                </div>
            </Link>
        </div>
    )
}