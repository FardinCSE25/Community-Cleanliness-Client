import React from 'react';
import CategoriesSection from '../Components/CategoriesSection';
import HeroSlider from '../Components/HeroSlider';
import CommunityStats from '../Components/CommunityStats';
import VolunteerSection from '../Components/VolunteerSection';
import RecentIssues from '../Pages/RecentIssues/RecentIssues';
import { useLoaderData } from 'react-router';

const Home = () => {
    const issuesList = useLoaderData()
    return (
        <div className='min-h-screen'>
            <HeroSlider/>
            <CategoriesSection />
            <RecentIssues issuesList={issuesList} />
            <CommunityStats />
            <VolunteerSection />
        </div>
    );
};

export default Home;