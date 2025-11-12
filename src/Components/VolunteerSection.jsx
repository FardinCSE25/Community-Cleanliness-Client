import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import img from "../assets/volunteers.jpg";

const VolunteerSection = () => {
  return (
    <motion.section
      className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl shadow-md hover:shadow-xl 
                 p-8 md:p-12 my-14 max-w-6xl mx-auto font-['Roboto'] overflow-hidden transition-all duration-300"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.div
        className="md:w-[600px] mb-8 md:mb-0"
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#228B22] mb-4 leading-snug">
          Volunteer for a Clean-Up Drive
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed text-lg">
          Join hands with your community to report and resolve cleanliness issues.
          Together, let’s build a greener and cleaner neighborhood. 🌿
        </p>
      </motion.div>

      <motion.div
        className="md:w-1/2"
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <img
          src={img}
          alt="Volunteers cleaning a park"
          className="rounded-2xl shadow-lg w-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </motion.div>
    </motion.section>
  );
};

export default VolunteerSection;
