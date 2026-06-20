// src/app/page.jsx
import TutorCard from '@/components/TutorCard';

const TopCard = async () => {
    // ডেটা ফেচ করছি
    const res = await fetch('http://localhost:5000/tutors-top', {
        cache: 'no-store' // রিয়েল-টাইম আপডেটের জন্য এটি জরুরি
    });
    const topTutors = await res.json();

    return (
        <div className="max-w-7xl mx-auto py-10">
            <h2 className="text-3xl font-bold mb-8 text-center">Top Tutors</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topTutors.map((tutor) => (
                    // এখানে আপনার আগের তৈরি করা TutorCard কম্পোনেন্টটি ব্যবহার করুন
                    <TutorCard key={tutor._id} tutor={tutor}></TutorCard>
                ))}
            </div>
        </div>
    );
};
export default TopCard;