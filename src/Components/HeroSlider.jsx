import { useState, useEffect, use } from "react";
// Assuming you have images imported correctly
import img1 from "../assets/image1.avif";
import img2 from "../assets/image2.jpg";
import img3 from "../assets/image3.jpg";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const slides = [
  {
    id: 1,
    title: "Community Cleanliness",
    highlight: "& Issue Reporting Portal",
    buttonText: "Get Started",
    img: img1,
  },
  {
    id: 2,
    title: "Organize Cleanup Drives",
    highlight: "with Local Volunteers",
    buttonText: "Join Now",
    img: img2,
  },
  {
    id: 3,
    title: "Track & Monitor Issues",
    highlight: "with Transparency",
    buttonText: "View Progress",
    img: img3,
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const {user} = use(AuthContext)

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setIsTransitioning(true); 
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setCurrentSlide(index);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <div className="relative w-full h-[70vh] overflow-hidden"> 
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-1000 ease-out ${
              isTransitioning ? "transitioning" : ""
            }`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
              backgroundImage: `url(${slide.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed", 
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
            
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}
            ></div>
          </div>
        ))}
      </div>

      <div className="absolute -top-40 left-0 right-0 bottom-0 z-20 h-full flex items-center"> 
        <div className="container mx-auto px-6 md:px-12 lg:px-20 w-full"> 
          <div className="max-w-2xl"> 
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute transition-all duration-700 ease-out w-full text-white ${
                  index === currentSlide
                    ? "opacity-100 transform translate-x-0"
                    : "opacity-0 transform translate-x-10 pointer-events-none"
                }`}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-left">
                  {slide.title}{" "}
                  <span className="block text-transparent bg-clip-text bg-[#228B22]">
                    {slide.highlight}
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed text-left max-w-xl">
                  Join thousands of community members making our neighborhoods cleaner and greener.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-start">
                  <button
                    className="group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-[#228B22]"
                  >
                    <Link to={user ? '' : '/login' } className="relative z-10">{slide.buttonText}</Link>
                    <div className="absolute inset-0 bg-[#228B22] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                  
                  <button className="px-8 py-4 rounded-xl font-semibold text-white border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/50 hover:scale-110 transition-all duration-300 group"
      >
        <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/50 hover:scale-110 transition-all duration-300 group"
      >
        <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-[#228B22] scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      <div className="absolute top-0 left-0 w-full h-1 z-40 bg-gray-600/30">
        <div
          className="h-full bg-[#228B22] transition-width duration-5000 ease-linear"
          style={{ width: "100%" }}
        ></div>
      </div>

    </div>
  );
};

export default HeroSlider;