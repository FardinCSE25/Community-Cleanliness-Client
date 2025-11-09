import React from 'react';
import CategoriesSection from '../Components/CategoriesSection';
import HeroSlider from '../Components/HeroSlider';
import CommunityStats from '../Components/CommunityStats';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <HeroSlider/>
            <CategoriesSection/>
            <CommunityStats/>
        </div>
    );
};

export default Home;