import { Card, Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MapPin, BookOpen, Clock, Users, GraduationCap, Award } from 'lucide-react';

const TutorCard = ({ tutor }) => {
    const { _id, name, photo, category, fee, location, mode, availableDays, totalSlot, institution, experience } = tutor;

    return (
        <Card className="w-full p-5 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 rounded-3xl">
            {/* Header: Photo */}
            <div className="relative overflow-hidden rounded-2xl mb-5">
                <Image
                    alt={name}
                    className="object-cover w-full h-60 hover:scale-105 transition-transform duration-500"
                    src={photo}
                    width={400}
                    height={300}
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm">
                    {mode}
                </div>
            </div>

            {/* Body: Information */}
            <div className="space-y-4">
                <div>
                    <h4 className="text-2xl font-extrabold text-gray-900">{name}</h4>
                    <div className="flex items-center gap-2 text-blue-600 font-medium mt-1">
                        <BookOpen size={16} /> {category}
                    </div>
                </div>

                {/* Grid layout for detailed info */}
                <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2"><MapPin size={16} className="text-red-500" /> {location}</p>
                    <p className="flex items-center gap-2"><GraduationCap size={16} className="text-purple-500" /> {institution}</p>
                    <p className="flex items-center gap-2"><Award size={16} className="text-yellow-500" /> {experience}</p>
                    <p className="flex items-center gap-2"><Clock size={16} className="text-green-500" /> {availableDays}</p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-2xl font-bold text-gray-800">${fee}<span className="text-sm font-normal text-gray-500">/hr</span></span>
                    <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-700">
                        <Users size={14} /> {totalSlot} Slots
                    </span>
                </div>
            </div>

            {/* Footer: Book Session Button */}
            <div className="mt-6">
                <Link href={`/tutors/${_id}`}>
                    <Button
                        fullWidth
                        color="primary"
                        variant="shadow"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-6 text-lg rounded-xl shadow-blue-200 transition-all hover:-translate-y-1 active:scale-95"
                    >
                        Book Session
                    </Button>
                </Link>
            </div>
        </Card>
    );
};

export default TutorCard;