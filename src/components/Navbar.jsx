"use client"
import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Link } from "@heroui/react";
import Image from "next/image";

const Navbar = () => {
    const {
        data: session,

    } = authClient.useSession()

    const user = session?.user;
    const handleSignUp = async () => {
        await authClient.signOut();
    };


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


                <div className="flex items-center gap-4 list-none">
                    {
                        user ? <>
                            <li>
                                <Avatar>
                                    <Avatar.Image referrerPolicy="no-referrer" alt="John Doe" src={user?.image} />
                                    <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                                </Avatar>
                            </li>
                            <li>
                                <Button onClick={handleSignUp} variant="danger" className={'rounded-none'}>Logout</Button>
                            </li>
                        </> :
                            <div className="flex items-center gap-4">
                                <Link href={"/login"} className="text-blue-600 font-semibold no-underline ">Login</Link>
                                <Link href={"/signup"} className="bg-blue-600 text-white px-4 py-2 rounded-lg no-underline">Sign Up</Link>
                            </div>

                    }
                </div>

            </div>



        </nav>
    );
};

export default Navbar;