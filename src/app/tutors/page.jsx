import TutorCard from '@/components/TutorCard';
import React from 'react';

const TutorPage = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutor`, {
        cache: 'no-store'
    });
    const data = await res.json();

    console.log("Data from API:", data);

    const tutors = Array.isArray(data) ? data : (data.tutors || []);

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