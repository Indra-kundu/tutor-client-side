"use client";
import React, { useState, useEffect, use } from 'react';
import {
    Button,
    Card,
    Modal,
    Input
} from '@heroui/react';


import {
    MapPin, BookOpen, DollarSign, UserCheck,
    Clock, Users, GraduationCap, Award,

} from 'lucide-react';

import Image from 'next/image';
import { authClient } from "@/lib/auth-client";

const TutorDetails = ({ params }) => {

    const { data: session, } = authClient.useSession()
    const user = session?.user;
    // console.log(user)

    const { id } = use(params);
    const [tutor, setTutor] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [departureDate, setDepartureDate] = useState("");



    useEffect(() => {
        fetch(`http://localhost:5000/tutor/${id}`)
            .then(res => res.json())
            .then(data => setTutor(data))
            .catch(err => console.error("Error fetching tutor data:", err));
    }, [id]);

    if (!tutor) return (
        <div className="flex justify-center items-center py-20 text-xl font-semibold text-gray-600">
            Loading...
        </div>
    );

    const {
        _id, name, photo, category, fee, location,
        mode, availableDays, totalSlot, institution, experience, date
    } = tutor;

    // const handleBooking = async () => {
    //     const bookingData = {
    //         userId: user?.id,
    //         userImage: user?.image,
    //         userName: user?.name,
    //         userEmail: user?.email,
    //         tutorId: _id,
    //         name,
    //         fee,
    //         photo,
    //         location,

    //         departureDate: new Date(departureDate)
    //     }

    //     const { data: tokenData } = await authClient.token()

    //     const res = await fetch('http://localhost:5000/booking', {
    //         method: "POST",
    //         headers: {
    //             'content-type': 'application/json',
    //             authorization: `Bearer ${tokenData?.token}`

    //         },
    //         body: JSON.stringify(bookingData),
    //     })

    //     const data = await res.json();
    //     // toast.success("You booked successfully!")

    // }

    const handleBooking = async () => {
        // tutor-er fixed date
        const tutorFixedDate = new Date(date); // 'date' hocche tutor object er property
        tutorFixedDate.setHours(0, 0, 0, 0);

        // user-er select kora date
        const selectedDate = new Date(departureDate);
        selectedDate.setHours(0, 0, 0, 0);

        // ১. Validation: Tutor-er date-er ager date hole error dekhabe
        if (selectedDate < tutorFixedDate) {
            alert("Error: You cannot book before the tutor's fixed date!");
            return; // Booking process theme jabe
        }

        // ২. Booking data prepare kora
        const bookingData = {
            userId: user?.id,
            userImage: user?.image,
            userName: user?.name,
            userEmail: user?.email,
            phoneNumber: phoneNumber,
            tutorId: _id,
            name,
            fee,
            photo,
            location,
            departureDate: selectedDate,
            status: "Pending"
        };

        const { data: tokenData } = await authClient.token();

        try {
            const res = await fetch('http://localhost:5000/booking', {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify(bookingData),
            });

            // if (res.ok) {
            //     alert("Booking successful!");
            //     setIsOpen(false);
            // } else {
            //     const data = await res.json();
            //     alert(data.message || "Failed to book session.");
            //     setIsOpen(false);

            // }
            if (res.ok) {
                setIsOpen(false); // আগে মডাল ক্লোজ করুন
                setTimeout(() => alert("Booking successful!"), 100);
                window.location.reload(); // এরপর অ্যালার্ট দিন
            } else {
                const data = await res.json();
                alert(data.message || "Failed to book session.");
            }
        } catch (error) {
            console.error("Booking error:", error);
            alert("An error occurred while booking.");
        }
    };
    const handleBookClick = () => {
        if (!session) {
            alert("Please login first to book a session.");
            return;
        }
        if (totalSlot <= 0) {
            alert("No available slots left.");
            return;
        }

        const today = new Date().setHours(0, 0, 0, 0);
        const tutorSessionDate = new Date(date).setHours(0, 0, 0, 0);

        if (tutorSessionDate > today) {
            alert("Booking is not available yet for this tutor");
            return;
        }
        setIsOpen(true);
    };


    const infoItems = [
        { icon: DollarSign, label: "Hourly Fee", value: `$${fee}/hr`, color: "text-green-600" },
        { icon: MapPin, label: "Location", value: location, color: "text-red-500" },
        { icon: UserCheck, label: "Teaching Mode", value: mode, color: "text-blue-500" },
        { icon: Clock, label: "Availability", value: availableDays, color: "text-orange-500" },
        { icon: Users, label: "Remaining Slots", value: `${totalSlot} Slots`, color: "text-indigo-500" },
        {
            icon: Clock,
            label: "Date",
            isBadge: true,
            color: "text-blue-700",
            value: new Date(date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            }),
        },
    ];
    // console.log(isOpen)

    return (
        <div className="max-w-6xl mx-auto py-16 px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">

                {/* বাম পাশ: ইমেজ এবং এক্সপেরিয়েন্স */}
                <div className="lg:col-span-5 relative">
                    <div className="sticky top-20">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src={photo}
                                alt={name}
                                width={500}
                                height={600}
                                className="w-full h-[500px] object-cover"
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

                {/* ডান পাশ: ইনফরমেশন কার্ড ও বাটন */}
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

                    {/* Card.Body এর বদলে সরাসরি div দিয়ে ডিজাইন ফিক্স করা হয়েছে */}
                    <Card className="shadow-xl border-none bg-white p-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                            {infoItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                                >
                                    <div className={`p-3 bg-gray-100 rounded-lg ${item.color}`}>
                                        <item.icon size={22} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase">
                                            {item.label}
                                        </p>
                                        {item.isBadge ? (
                                            <div className="flex items-center gap-2 text-blue-700 bg-blue-50 px-3 py-1 rounded-full w-fit mt-1">
                                                <span className="text-sm font-semibold">{item.value}</span>
                                            </div>
                                        ) : (
                                            <p className="text-sm font-bold text-gray-800">{item.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Button
                        size="lg"
                        onPress={handleBookClick}
                        className="w-full bg-blue-600 text-white font-bold py-7 text-lg rounded-2xl"
                    >
                        Book Session
                    </Button>



                    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
                        <Modal.Backdrop>
                            <Modal.Container>
                                <Modal.Dialog className="bg-white text-gray-900 border border-gray-100 p-6 rounded-2xl w-full max-w-md mx-auto shadow-2xl">                                    <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-6">
                                        Book Session with {name}
                                    </h2>

                                    <div className="flex flex-col gap-4">
                                        <Input

                                            label="Student Name"
                                            value={session?.user?.name || ""}
                                            readOnly
                                        />

                                        <Input
                                            label="Student Email"
                                            value={session?.user?.email || ""}
                                            readOnly
                                        />

                                        <Input
                                            label="Tutor Name"
                                            value={name}
                                            readOnly
                                        />

                                        {/* <Input
                                            label="Phone Number"
                                            placeholder="Enter your phone number"
                                            type="tel"
                                            onChange={setPhoneNumber}
                                        /> */}
                                        <Input
                                            label="Phone Number"
                                            placeholder="Enter your phone number"
                                            type="tel"
                                            value={phoneNumber} // ভ্যালু সেট করুন
                                            onChange={(e) => setPhoneNumber(e.target.value)} // এভাবে ইভেন্ট হ্যান্ডেল করুন
                                        />
                                        <Input
                                            label="Departure Date"
                                            // placeholder="Enter Date"
                                            type="date"
                                            min={new Date(date).toISOString().split("T")[0]}
                                            onChange={(e) => setDepartureDate(e.target.value)}
                                        />

                                    </div>

                                    <div className="flex justify-end gap-3 mt-6">
                                        <Button
                                            color="danger"
                                            variant="light"
                                            onPress={() => setIsOpen(false)}
                                        >
                                            Close
                                        </Button>

                                        <Button onClick={handleBooking} color="primary">
                                            Confirm
                                        </Button>
                                    </div>
                                </div>
                                </Modal.Dialog>
                            </Modal.Container>
                        </Modal.Backdrop>
                    </Modal>

                </div>
            </div>
        </div>
    );
};

export default TutorDetails;