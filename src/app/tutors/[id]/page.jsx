import React from 'react';
import { Button, Card } from '@heroui/react';
import { MapPin, BookOpen, DollarSign, UserCheck, Clock, Users, GraduationCap, Award } from 'lucide-react';
import Image from 'next/image';

const TutorDetails = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`http://localhost:5000/tutor/${id}`);
    const tutor = await res.json();
    if (!tutor) {
        return <div className="text-center py-20">Tutor not found!</div>;
    }
    const {
        name, photo, category, fee, location, mode,
        availableDays, totalSlot, institution, experience
    } = tutor;

    return (
        <div className="max-w-6xl mx-auto py-16 px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* বাম পাশ: ইমেজ এবং এক্সপেরিয়েন্স */}
                <div className="lg:col-span-5 relative">
                    <div className="sticky top-20">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src={photo}
                                alt={name}
                                width={500}
                                height={600}
                                className="w-full h-500px object-cover"
                            />
                        </div>
                        <div className="mt-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <Award size={20} className="text-yellow-500" /> Teaching Experience
                            </h3>
                            <p className="text-gray-600 leading-relaxed">{experience}</p>
                        </div>
                    </div>
                </div>

                {/* ডান পাশ: সব ইনফরমেশন */}
                <div className="lg:col-span-7 space-y-8">
                    <div>
                        <h1 className="text-5xl font-extrabold text-gray-900">{name}</h1>
                        <div className="flex flex-wrap gap-3 mt-4">
                            <span className="flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full text-blue-700 font-medium">
                                <BookOpen size={18} /> {category} Specialist
                            </span>
                            <span className="flex items-center gap-2 bg-purple-50 px-4 py-1.5 rounded-full text-purple-700 font-medium">
                                <GraduationCap size={18} /> {institution}
                            </span>
                        </div>
                    </div>

                    {/* ইনফরমেশন গ্রিড */}
                    <Card className="border-none shadow-xl bg-white p-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                            {[
                                { icon: DollarSign, label: "Hourly Fee", value: `$${fee}/hr`, color: "text-green-600" },
                                { icon: MapPin, label: "Location", value: location, color: "text-red-500" },
                                { icon: UserCheck, label: "Teaching Mode", value: mode, color: "text-blue-500" },
                                { icon: Clock, label: "Availability", value: availableDays, color: "text-orange-500" },
                                { icon: Users, label: "Remaining Slots", value: `${totalSlot} Slots`, color: "text-indigo-500" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                    <div className={`p-3 bg-gray-100 rounded-lg ${item.color}`}>
                                        <item.icon size={22} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase">{item.label}</p>
                                        <p className="text-sm font-bold text-gray-800">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Button
                        size="lg"
                        className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-7 text-lg rounded-2xl shadow-lg transition-all active:scale-95"
                    >
                        Book Session
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TutorDetails;