import React, { useState, use, useEffect } from "react";
import { Link, NavLink } from "react-router"; 
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { ArrowUp } from 'lucide-react';
import logo from "../../assets/28ea99ca-c20d-4bea-adfa-cd5f91d53bb2.jpeg"
import "./Navbar.css";

const Navbar = () => {
    const { user,
         logOut
         } = use(AuthContext);
         console.log(user);
         
    const [showTopBtn, setShowTopBtn] = useState(false);

    // Scroll event to toggle "scroll to top" button
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) setShowTopBtn(true);
            else setShowTopBtn(false);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        logOut()
            .then(() => toast.error("Logout Successful"))
            .catch((error) => toast.error(error.message));
    };

    // Smooth scroll helper
    // const scrollToSection = (id) => {
    //     const section = document.getElementById(id);
    //     if (section) {
    //         section.scrollIntoView({ behavior: "smooth" });
    //     }
    // };

    const navOptions = (
        <>

            
                <NavLink
                    to="/"
                >
                    <li className="text-lg mr-5 ">
                        Home
                    </li>
                </NavLink>
            
            
                <NavLink
                to="/allIssues"
                    
                >
                    <li className="text-lg mr-5">
                All Issues
                </li>
                </NavLink>
            
            {
                user && <>
                 <NavLink
                to="/addIssue"
                    
                >
                    <li className="text-lg mr-5">
                Add Issue
                </li>
                </NavLink>
                <NavLink
                to="/myIssues"
                    
                >
                    <li className="text-lg mr-5">
                    My Issues
                    </li>
                </NavLink>
            
                <NavLink
                to="/myContribution"
                    
                >
                    <li className="text-lg mr-5">
                My Contribution
                </li>
                </NavLink>
            </>
            } 
        </>
    );

    return (
        <>
            <div
                className={`bg-white shadow-lg bg-opacity-95 pb-4 backdrop-blur-sm w-full flex justify-center top-0 z-50 md:px-7 transition-all duration-300 ease-in-out`}
            >
                <div className="w-full px-5 pt-2 2xl:max-w-screen-2xl flex items-center justify-between mt-5 md:mt-2">
                    {/* Mobile Dropdown */}
                    <div className="md:hidden font-bold text-3xl dropdown">
                        <button tabIndex={0} className="mr-5 text-[#228B22]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </button>
                        <ul
                            tabIndex={0}
                            className="menu w-44 p-2 menu-sm dropdown-content font-semibold bg-white border border-blue-200 rounded-lg shadow-lg transition-transform duration-300 z-30"
                        >
                            {navOptions}
                        </ul>
                    </div>

                    {/* Logo */}
                    <div>
                        <Link to="/">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-16 rounded-full md:ml-16 pb-3 md:pb-0"
                            />
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="navi">
                        <ul className="hidden md:flex text-lg font-semibold menu-horizontal px-1 space-x-6">
                            {navOptions}
                        </ul>
                    </div>

                    {/* User Info */}
                    <div className="flex justify-between items-center gap-7">
                        {
                            user && <> <button
                            >
                                <img
                                    referrerPolicy="no-referrer"
                                    className="w-12 rounded-full"
                                    src={user.photoURL}
                                    alt=""
                                />
                            </button>
                            </>
                        }
    {
        user && <> <button onClick={handleLogout} className="btn text-white bg-[#228B22]"
                            >
                                Logout
                            </button>
                            </>
    }

                        {
                            !user && <Link to="/login" className="btn text-white bg-[#228B22]">
                                Login
                            </Link>
                        }

                        {
                            !user && <Link to="/register" className="btn text-white bg-[#228B22]">
                                Register
                            </Link>
                        }



                    </div>
                </div>
            </div>

            {/* Scroll To Top Button */}
            {showTopBtn && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#228B22] text-white shadow-xl hover:shadow-2xl transition-all duration-300 ease-out z-50 group border-2 border-blue-400/30 hover:border-blue-300/60 hover:scale-110 transform hover:-translate-y-1 animate-pulse-slow"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-6 h-6 mx-auto group-hover:-translate-y-0.5 transition-transform duration-300" />

                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-md group-hover:bg-blue-400/30 transition-all duration-500 -z-10"></div>
                </button>
            )}
        </>
    );
};

export default Navbar;