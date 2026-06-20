"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
    {
        title: "Find Your Perfect Tutor Today",
        desc: "Expert tutors ready to help you excel in Mathematics.",
        image: "/assets/banner1.jpg" // আপনার প্রথম ছবির পাথ
    },
    {
        title: "Personalized Learning Journey",
        desc: "Unlock your potential with customized Physics sessions.",
        image: "/assets/banner2.jpg" // আপনার দ্বিতীয় ছবির পাথ
    },
    {
        title: "Master Your Subjects",
        desc: "Professional guidance for Chemistry and beyond.",
        image: "/assets/banner3.jpg" // আপনার তৃতীয় ছবির পাথ
    },
];

const Banner = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setIndex((prev) => (prev + 1) % slides.length), 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div
            className="relative h-[600px] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center transition-all duration-700"
            style={{ backgroundImage: `url(${slides[index].image})` }} // এখানে ডাইনামিক ইমেজ সেট করা হয়েছে
        >      {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 text-center text-white p-6 max-w-4xl"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">{slides[index].title}</h1>
                    <p className="text-lg md:text-xl mb-8">{slides[index].desc}</p>
                    <Link href="/tutors">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white uppercase px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105">
                            Explore Tutors
                        </button>
                    </Link>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Banner;