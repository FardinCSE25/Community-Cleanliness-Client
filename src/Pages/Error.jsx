import React from 'react';
import { Link } from 'react-router';
import error from "../assets/error-404.png"
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer';

const Error = () => {
    return (
        <>
            <Navbar />
            <div className='max-w-[750px] w-full mx-auto px-4 pt-20 pb-32 inter text-center'>

                <img className='pb-6 mx-auto w-60 md:w-80' src={error} alt="error" />

                <h1 className='font-semibold text-3xl md:text-5xl mb-4'>
                    Oops, page not found!
                </h1>

                <p className='text-sm md:text-base mb-6 text-gray-600'>
                    The page you are looking for is not available.
                </p>

                <div className='mx-auto'>
                    <Link 
                        to={"/"} 
                        className='px-6 py-3 md:py-4 btn bg-[#228B22] text-white w-full md:w-auto'
                    >
                        Go Back!
                    </Link>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default Error;
