import React from 'react';
import CategoriesSection from '../Components/CategoriesSection';
import HeroSlider from '../Components/HeroSlider';
import CommunityStats from '../Components/CommunityStats';
import VolunteerSection from '../Components/VolunteerSection';
import RecentIssues from '../Pages/RecentIssues/RecentIssues';
import { useLoaderData } from 'react-router';
import Mission from '../Components/Mission';
import AboutUs from '../Components/AboutUs';
import VideoSection from '../Components/VideoSection';

const Home = () => {
    const issuesList = useLoaderData()
    return (
        <div className='min-h-screen'>
            <HeroSlider/>
            <CategoriesSection />
            <RecentIssues issuesList={issuesList} />
            <VideoSection/>
            <CommunityStats />
            <AboutUs/>
            <Mission/>
            <VolunteerSection />
        </div>
    );
};

export default Home;