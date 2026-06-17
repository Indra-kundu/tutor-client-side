import { Link } from "@heroui/react";
import Image from "next/image";

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">

                {/* Left: Logo */}
                <div className="text-2xl font-bold text-blue-700">
                    <Link href={"/"} className="no-underline">EduBridge</Link>
                </div>

                {/* Middle: Links */}
                <ul className="flex gap-8 font-medium">
                    <li><Link href={"/"} className="no-underline hover:text-blue-700">Home</Link></li>
                    <li><Link href={"/tutors"} className="no-underline hover:text-blue-700">Tutors</Link></li>
                    <li><Link href={"/add-tutor"} className="no-underline hover:text-blue-700">Add Tutor</Link></li>
                    <li><Link href={"/my-tutors"} className="no-underline hover:text-blue-700">My Tutors</Link></li>
                    <li><Link href={"/my-booked-sessions"} className="no-underline hover:text-blue-700">My Booked Sessions</Link></li>
                </ul>
                {/* 
               
                {/* Right: Login, Signup, and Profile Dropdown */}
                <div className="flex items-center gap-4">
                    <Link href={"/login"} className="text-blue-600 font-semibold no-underline ">Login</Link>
                    <Link href={"/register"} className="bg-blue-600 text-white px-4 py-2 rounded-lg no-underline">Sign Up</Link>

                    {/* Profile Dropdown */}
                    <div className="relative group">
                        {/* Profile Image */}
                        <Image
                            src="/assets/profile.png"
                            alt="Profile"
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
                        />

                        {/* Dropdown Menu */}
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg hidden group-hover:block z-50">
                            <ul className="py-2 text-sm text-gray-700">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    <Link href={"/profile"} className={"no-underline"}>Profile Link</Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer">
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;