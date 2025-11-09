import React from 'react';
import CategoriesSection from '../Components/CategoriesSection';
import HeroSlider from '../Components/HeroSlider';
import CommunityStats from '../Components/CommunityStats';
import VolunteerSection from '../Components/VolunteerSection';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <HeroSlider/>
            <CategoriesSection/>
            <CommunityStats/>
            <VolunteerSection/>
        </div>
    );
};

export default Home;