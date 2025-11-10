import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock, Image, LogIn } from 'lucide-react';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';


const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { createUser, setUser, updateUser,
         googleSignIn 
        } = use(AuthContext)

    const handleGoogleSignIn = (e) => {
            e.preventDefault()
            googleSignIn()
                .then(userData => {
                    const user = userData.user
                    toast.success("Login Successful")
                    updateUser({
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    })
                        .then(() => {
                            setUser({ ...user })
                        })
                        .catch((error) => {
                            console.log(error);
                            setUser(user)
                        })
    
                    navigate(`${location.state ? location.state : "/"}`)
                })
                .catch(error => {
                    console.log(error);
                })
        } 

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value
        const email = e.target.email.value
        const photo = e.target.photo.value
        const password = e.target.password.value
        // console.log({ name, email, password });

        const passwordLength = /^.{6,}$/;
        if (!passwordLength.test(password)) {
            setError('Password must be 6 characters or longer!')
            return;
        }
        const passwordUp = /^(?=.*[A-Z]).+$/;
        if (!passwordUp.test(password)) {
            setError('Password must contain a uppercase letter!')
            return;
        }
        const passwordLow = /^(?=.*[a-z]).+$/;
        if (!passwordLow.test(password)) {
            setError('Password must contain a lower letter!')
            return;
        }
        setError('')
        createUser(email, password)
            .then(userData => {
                const user = userData.user
                console.log(user);
                
                updateUser({
                    displayName: name,
                    photoURL: photo
                })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo })
                    })
                    .catch((error) => {
                        console.log(error);
                        setUser(user)
                    })

                toast.success("Account Created")
                navigate('/')
                setName('');
                setEmail('');
                setPhoto('');
                setPassword('');
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage)
            });
    };

    const formVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 50, damping: 15 } }
    };

    const imageVariants = {
        hidden: { x: 100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 50, damping: 15, delay: 0.2 } }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
            <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row rounded-3xl shadow-2xl overflow-hidden bg-white">

                {/* Left Side: Animated Sign Up Form */}
                <motion.div
                    className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-10">
                        Create Your Account
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Input */}
                        <div>
                            <label className="text-lg font-medium text-gray-700 flex items-center mb-1">
                                <User className="w-5 h-5 mr-2 text-green-500" /> Name
                            </label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                name="name"
                                type="text"
                                className="input w-full p-3 bg-white text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
                                placeholder="Your Name"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="text-lg font-medium text-gray-700 flex items-center mb-1">
                                <Mail className="w-5 h-5 mr-2 text-cyan-500" /> Email
                            </label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name='email'
                                type="email"
                                className="input w-full bg-white text-black p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
                                placeholder="Your Email"
                                required
                            />
                        </div>

                        {/* Photo URL Input */}
                        <div>
                            <label className="text-lg font-medium text-gray-700 flex items-center mb-1">
                                <Image className="w-5 h-5 mr-2 text-indigo-500" /> Photo URL
                            </label>
                            <input
                                value={photo}
                                onChange={(e) => setPhoto(e.target.value)}
                                name='photo'
                                type="text"
                                className="input w-full bg-white text-black p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
                                placeholder="Your Photo URL (Optional)"
                            />
                        </div>

                        {/* Password Input with Toggle */}
                        <div>
                            <label className="text-lg font-medium text-gray-700 flex items-center mb-1">
                                <Lock className="w-5 h-5 mr-2 text-green-500" /> Password
                            </label>
                            <div className="relative">
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    className="input w-full bg-white text-black p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 pr-10"
                                    placeholder="Password"
                                    required
                                />
                                {error && <p className='text-red-600 text-xs'>{error}</p>}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-500 transition"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button type="submit"
                                onClick={handleGoogleSignIn}
                                className="group relative flex items-center justify-center w-full px-6 py-3.5 bg-white text-gray-700 font-medium rounded-xl border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-green-100 focus:ring-opacity-50"
                            >

                                <div className="absolute inset-0 rounded-xl bg-linear-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full" />

                                
                                <div className="relative flex items-center justify-center w-6 h-6 mr-3">
                                    <svg
                                        aria-label="Google logo"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        className="transition-transform duration-300 group-hover:scale-110"
                                    >
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                </div>

                                
                                <span className="relative font-semibold text-[15px] tracking-wide transition-all duration-300 group-hover:tracking-wider">
                                    Continue with Google
                                </span>
                            </button>


                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full cursor-pointer text-xl py-3 mt-6 rounded-xl font-bold text-white shadow-lg 
                                       bg-[#228B22] hover:from-green-700 hover:to-cyan-600 
                                       transition duration-300 flex items-center justify-center space-x-2"
                        >
                            <LogIn className="w-5 h-5" />
                            <span>Register</span>
                        </motion.button>
                    </form>

                    {/* Login Link */}
                    <p className='text-center text-base mt-4 text-gray-600'>
                        Already have an account?
                        <Link to="/login" className='text-[#228B22] font-semibold ml-1 hover:underline'>
                            Login
                        </Link>
                    </p>
                </motion.div>

                {/* Right Side: Animated Visual Element (Lottie Placeholder) */}
                <motion.div
                    className="hidden lg:block w-full lg:w-1/2 p-16 bg-[#228B22] flex items-center justify-center relative"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="absolute inset-0 opacity-10 bg-white/20"></div>

                    {/* Placeholder for Lottie Animation or Image */}
                    <div className="relative text-white z-10 text-center">
                        <svg className="w-64 h-64 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Simple SkillSwap Graphic for illustration */}
                            <motion.circle
                                cx="12" cy="12" r="10" stroke="white" strokeWidth="2"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1, type: 'spring' }}
                            />
                            <motion.path
                                d="M8 12L12 16L16 8"
                                stroke="white" strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                            />
                        </svg>
                        <motion.h2
                            className="mt-6 text-4xl font-extrabold"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.8 }}
                        >
                            Unlock Your Potential
                        </motion.h2>
                        <motion.p
                            className="mt-2 text-lg font-light"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 2.0 }}
                        >
                            Join thousands of learners in swapping skills and knowledge.
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;