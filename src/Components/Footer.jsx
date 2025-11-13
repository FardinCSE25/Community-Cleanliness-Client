
import { Facebook, Youtube, ArrowRight, Mail, MapPin, Phone, Heart, Trees, Users, Shield, Globe } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import logo from "../assets/28ea99ca-c20d-4bea-adfa-cd5f91d53bb2.jpeg"


const FloatingCircle = ({ className, size, duration, delay }) => {
    return (
        <div
            className={`absolute rounded-full pointer-events-none transition-opacity ${className}`}
            style={{
                width: size,
                height: size,
                animation: `floatAnim ${duration}s infinite alternate ease-in-out`,
                animationDelay: `${delay}s`,
                opacity: 0.15,
            }}
        />
    );
};

const Footer = () => {
    const NavLink = ({ href, children }) => (
        <a
            href={href}
            className="block text-base-content/80 hover:text-[#228B22] transition-all duration-300 py-2 hover:pl-2 border-l-2 border-transparent hover:border-[#228B22]/60 cursor-pointer"
        >
            {children}
        </a>
    );

    const StatCard = ({ number, label }) => (
        <div
            className="text-center p-3 rounded-xl border border-base-300 shadow-md hover:shadow-lg transition duration-300 hover:scale-[1.03]"
        >
            <div className="text-xl font-black text-[#228B22]">{number}</div>
            <div className="text-xs text-base-content/70">{label}</div>
        </div>
    );

    return (
        <footer
            className="font-sans relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900/20"
        >

            <style jsx="true">{`
                @keyframes floatAnim {
                    0% { transform: translateY(0px); }
                    100% { transform: translateY(-15px); }
                }
            `}</style>


            <FloatingCircle className="top-10 left-5 bg-[#228B22]" size={24} duration={4} delay={0} />
            <FloatingCircle className="top-32 right-10 bg-info" size={32} duration={5} delay={1} />
            <FloatingCircle className="bottom-44 left-1/4 bg-warning" size={16} duration={3.5} delay={2} />


            <div
                className="w-full bg-gradient-to-r from-green-800 to-green-400
                           py-16 rounded-t-[4rem] md:rounded-t-[5rem] shadow-2xl relative overflow-hidden mb-12"
            >

                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-20 h-20 border-2 border-[#228B22]-content rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-[#228B22]-content rounded-full"></div>
                </div>

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center px-6 relative z-10">
                    <div className="text-center lg:text-left mb-8 lg:mb-0">
                        <h3 className="text-4xl lg:text-5xl font-black text-[#228B22]-content mb-4 leading-tight">
                            Together We Can Make
                            <span className="block text-warning">
                                A Cleaner World
                            </span>
                        </h3>
                        <p className="text-xl text-[#228B22]-content/90 max-w-2xl">
                            Join thousands of community heroes in making our environment cleaner and safer for everyone. 🌍
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">

                        <a
                            href="/addIssue"
                            className="btn btn-[#228B22] btn-lg shadow-xl hover:shadow-2xl transition duration-300 relative overflow-hidden group"
                        >
                            <span className="flex items-center gap-2">
                                Report an Issue
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </span>
                        </a>


                        <button
                            className="btn btn-outline btn-lg text-[#228B22]-content border-2 border-[#228B22]-content hover:bg-[#228B22]-content/10 transition duration-300"
                        >
                            Volunteer
                        </button>
                    </div>
                </div>
            </div>


            <div className="w-full bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900/20 pt-12 pb-16 relative">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">


                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-4 mb-6 transition-transform hover:scale-[1.02]">
                            <div className="transition-transform hover:rotate-[360deg] duration-700">
                                <img
                                    src={logo}
                                    alt="Community Cleanliness Logo"
                                    className="w-12 h-12 rounded-2xl shadow-lg border-2 border-[#228B22]/50"
                                />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black bg-gradient-to-r from-[#228B22] to-[#228B22] bg-clip-text text-transparent">
                                    Community Cleanliness
                                </h2>
                                <p className="text-sm text-base-content/70 font-medium">
                                    Making Earth Greener
                                </p>
                            </div>
                        </div>

                        <p className="text-base-content/80 text-lg leading-relaxed transition-transform hover:scale-[1.01]">
                            🌱 Empowering communities to create sustainable, clean environments through technology and collective action.
                            Every report makes a difference!
                        </p>


                        <div className="space-y-3 pt-4">
                            <div className="flex items-center gap-3 text-base-content/80 hover:text-[#228B22] transition-colors duration-200 group cursor-pointer hover:translate-x-1">
                                <div className="p-2 bg-[#228B22]/10 rounded-lg group-hover:bg-[#228B22]/20 transition-colors">
                                    <Mail className="w-4 h-4 text-[#228B22]" />
                                </div>
                                <span className="font-medium">fardinahmed3200@gmail.com</span>
                            </div>

                            <div className="flex items-center gap-3 text-base-content/80 hover:text-info transition-colors duration-200 group cursor-pointer hover:translate-x-1">
                                <div className="p-2 bg-info/10 rounded-lg group-hover:bg-info/20 transition-colors">
                                    <Phone className="w-4 h-4 text-info" />
                                </div>
                                <span className="font-medium">+880 (1814) 935430</span>
                            </div>

                            <div className="flex items-center gap-3 text-base-content/80 hover:text-warning transition-colors duration-200 group cursor-pointer hover:translate-x-1">
                                <div className="p-2 bg-warning/10 rounded-lg group-hover:bg-warning/20 transition-colors">
                                    <MapPin className="w-4 h-4 text-warning" />
                                </div>
                                <span className="font-medium">Global Community</span>
                            </div>
                        </div>


                        <div className="flex gap-4 pt-4">
                            {[
                                { icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/fardin.ahmed.493619/", color: "text-blue-600 hover:bg-blue-600/10" },
                                { icon: <FaXTwitter />, href: "https://x.com/FardinAhmed203", color: "text-base-content hover:bg-base-content/10" },
                                { icon: <Youtube className="w-5 h-5" />, href: "https://www.youtube.com/@Nafiz0809", color: "text-red-600 hover:bg-red-600/10" },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-3 bg-base-100 rounded-xl ${social.color} transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-[1.15] hover:-translate-y-1`}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>


                    <nav className="space-y-0">
                        <h6 className="text-xl font-bold text-base-content flex items-center gap-2 pb-1 mb-2 border-b-2 border-[#228B22]/40">
                            <Trees className="w-5 h-5 text-[#228B22]" />
                            Our Services
                        </h6>
                        {[
                            "Report Environmental Issues", "Track Cleanup Progress", "Request Community Drives",
                            "Pay Cleanup Contributions", "Mobile App Integration", "Recognition Programs"
                        ].map((service, index) => <NavLink key={index} href="/addIssue">{service}</NavLink>)}
                    </nav>

                    <nav className="space-y-0">
                        <h6 className="text-xl font-bold text-base-content flex items-center gap-2 pb-1 mb-2 border-b-2 border-[#228B22]/40">
                            <Users className="w-5 h-5 text-[#228B22]" />
                            About Us
                        </h6>
                        {[
                            "Our Mission & Vision", "Contact & Support", "Join as Volunteer",
                            "Success Stories", "Our Achievements", "Research & Impact"
                        ].map((item, index) => <NavLink key={index} href="#">{item}</NavLink>)}
                    </nav>

                    <nav className="space-y-0">
                        <h6 className="text-xl font-bold text-base-content flex items-center gap-2 pb-1 mb-2 border-b-2 border-[#228B22]/40">
                            <Shield className="w-5 h-5 text-[#228B22]" />
                            Legal & Support
                        </h6>
                        {[
                            "Terms of Service", "Privacy Policy", "Data Protection",
                            "Environmental Guidelines", "FAQ & Help Center", "Community Guidelines"
                        ].map((item, index) => <NavLink key={index} href="#">{item}</NavLink>)}
                    </nav>


                    <div className="lg:col-span-1 space-y-4">
                        <h6 className="text-xl font-bold text-base-content flex items-center gap-2 pb-2 mb-2 border-b-2 border-[#228B22]/40">
                            <Globe className="w-5 h-5 text-[#228B22]" />
                            Our Impact
                        </h6>
                        <div className="grid grid-cols-2 gap-4">
                            <StatCard number="50K+" label="Issues Resolved" />
                            <StatCard number="120+" label="Cities Served" />
                            <StatCard number="25K+" label="Volunteers" />
                            <StatCard number="98%" label="Positive" />
                        </div>
                    </div>
                </div>
            </div>


            <div
                className="w-full bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900/20 border-t border-base-300 px-6 py-6"
            >
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
                    <p
                        className="text-base-content/70 text-center lg:text-left flex items-center gap-2"
                    >
                        <span>&copy; {new Date().getFullYear()} Community Cleanliness Initiative.</span>
                        <span className="flex items-center gap-1">
                            Made with <Heart className="w-4 h-4 text-error fill-error animate-pulse" /> for a better planet
                        </span>
                    </p>

                    <div className="flex items-center gap-6 text-sm text-base-content/60">
                        {["Privacy", "Terms", "Cookies", "Security"].map((item, index) => (
                            <a
                                key={index}
                                className="hover:text-[#228B22] transition-colors duration-200 cursor-pointer hover:scale-110"
                                href="#"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

const App = () => {

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900/20 font-sans">

            <Footer />
        </div>
    );
};

export default App;