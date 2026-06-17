import TutorCard from '@/components/TutorCard';
import React from 'react';

const TutorPage = async () => {
    const res = await fetch('http://localhost:5000/tutor')
    const tutors = await res.json()

    return (
        <div className='max-w-7xl mx-auto mt-8'>
            <h1 className='font-bold text-2xl'>All Tutors</h1>
            <div className='grid grid-cols-3 gap-5 mt-5'>
                {tutors.map(tutor =>
                    <TutorCard key={tutor._id} tutor={tutor}></TutorCard>
                )}
            </div>
        </div>
    );
};

export default TutorPage;