import { BookingCancelAlert } from '@/components/BookingCancelAlert';
import { auth } from '@/lib/auth';
import { TrashBin } from '@gravity-ui/icons';
import { Button, Chip } from '@heroui/react';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const { token } = await auth.api.getToken({
        headers: await headers(),
    });

    const user = session?.user;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`,
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    );
    const bookings = await res.json();

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900">My Bookings</h1>
                <Chip color="primary" variant="flat">{bookings.length} Sessions</Chip>
            </div>

            {bookings.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
                    <p className="text-gray-500">No sessions booked yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="flex items-center gap-6 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* ইমেজ */}
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                                <Image
                                    src={booking.photo}
                                    alt={booking.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* তথ্য */}
                            <div className="flex-grow grid grid-cols-4 items-center gap-4">
                                <div>
                                    <h2 className="font-bold text-gray-800">{booking.userName || "N/A"}</h2>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">Student</p>
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg text-gray-800">{booking.name}</h2>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">Tutor Name</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">
                                        {new Date(booking.departureDate).toLocaleDateString("en-US", {
                                            month: "short", day: "numeric", year: "numeric"
                                        })}
                                    </p>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">Date</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-blue-600">${booking.fee}</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">Fee</p>
                                </div>
                            </div>

                            <BookingCancelAlert bookingId={booking._id}></BookingCancelAlert>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookingPage;