import React from 'react';
import { Link } from 'react-router';
import error from "../assets/error-404.png"
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer';

const Error = () => {
    return (
        <>
            <Navbar />
            <div className='w-[750px] mx-auto pt-32 pb-48 inter'>
                <img className='pb-6 mx-auto' src={error} alt="error" />
                <h1 className='text-center font-semibold text-5xl mb-5'>
                    Oops, page not found!
                </h1>
                <p className='text-center mb-8'>
                    The page you are looking for is not available.
                </p>
                <div className='w-[117px] mx-auto'>
                    <Link to={"/"} className='text-center px-6 py-5 btn bg-[#2980b9] text-white'>
                        Go Back!
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Error;