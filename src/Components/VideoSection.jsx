import { Link } from "react-router";
import video from "../assets/5416372_Coll_wavebreak_People_3840x2160.mp4";

const VideoSection = () => {
  return (
    <section className="relative min-h-screen mt-20 flex items-center justify-start overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video className="w-full h-full object-cover" autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

      {/* Content Section */}
      <div className="relative z-10 text-white px-6 md:px-16 max-w-screen-lg w-full">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
          Build a <span className="text-[#228B22]">Cleaner Community</span> <br />
          by Reporting & Solving <br />
          Local Environmental Issues
        </h2>

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl font-medium">
          Join hands to make your neighborhood{" "}
          <span className="text-[#228B22] font-bold">Greener</span>,{" "}
          <span className="text-[#228B22] font-bold">Safer</span>, and{" "}
          <span className="text-[#228B22] font-bold">Cleaner</span> for everyone.
        </p>

        {/* Button */}
        <Link to="/addIssue">
          <button className="mt-8 px-8 py-3 bg-[#228B22] text-white font-bold rounded-lg hover:bg-[#1c701c] transition-all duration-300">
            Report an Issue
          </button>
        </Link>
      </div>
    </section>
  );
};

export default VideoSection;
