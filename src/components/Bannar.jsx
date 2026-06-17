import { Separator } from "@heroui/react";
import Link from "next/link";

const Banner = () => {
    return (
        <div className="bg-[url('/assets/banner.jpg')] bg-cover bg-center bg-no-repeat text-white flex justify-between flex-col items-center gap-5 h-150">

            {/* Main Banner Content */}
            <div className="p-10 text-center flex justify-center flex-col items-center gap-3.5 flex-1">
                <h1 className="text-6xl font-bold">
                    Find Your Perfect <br /> Tutor Today
                </h1>

                <p className="text-xl">
                    Connect with expert tutors and accelerate your learning journey <br />
                    with personalized online sessions.
                </p>

                <div className="flex gap-5 mt-4">

                    <Link href={"/tutors"}><button className=" btn btn-primary uppercase px-6 py-3 rounded-lg font-semibold  cursor-pointer">
                        Call-to-action
                    </button></Link>
                </div>
            </div>



        </div>
    );
};

export default Banner;