
"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Spinner } from "@heroui/react";
import toast from "react-hot-toast";
import UpdateModal from "@/components/UpdateModal";
import Image from "next/image";

// হুকটি এখানে রাখুন
const useDisclosure = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onOpenChange = (val) => setIsOpen(typeof val === 'boolean' ? val : !isOpen);
    return { isOpen, onOpen, onOpenChange };
};

const MyTutorsPage = () => {
    // ১. সব স্টেট এবং হুক এখানে ডিক্লেয়ার করুন
    const { data: session, isPending } = authClient.useSession();
    const [tutors, setTutors] = useState([]);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingTutor, setEditingTutor] = useState(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // ২. টোকেন ফেচ করা
    useEffect(() => {
        const getToken = async () => {
            const { data: tokenData } = await authClient.token();
            setToken(tokenData?.token);
            setLoading(false);
        };
        getToken();
    }, []);


    // ৩. ডেটা ফেচ করা (টোকেন পাওয়ার পর)
    useEffect(() => {
        if (!loading && session?.user?.email && token) {
            fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-tutors/${session.user.email}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
                .then(res => {
                    if (!res.ok) throw new Error("Unauthorized");
                    return res.json();
                })
                .then(data => setTutors(Array.isArray(data) ? data : []))
                .catch(err => {
                    console.error("Fetch Error:", err);
                    toast.error("You are not authorized to view this.");
                });
        }
    }, [session?.user?.email, token, loading]);

    // ৪. ডিলিট লজিক
    const handleDelete = async (id) => {
        if (!confirm("Are you sure?")) return;
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/delete-tutor/${id}`, {
            method: 'DELETE',
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
            setTutors(tutors.filter(t => t._id !== id));
            toast.success("Deleted successfully");
        } else {
            toast.error("Failed to delete");
        }
    };

    //edit logic
    const handleEditClick = (tutor) => {
        setEditingTutor(tutor);
        onOpen();
    };

    if (isPending || loading) return <div className="flex justify-center p-10"><Spinner /></div>;

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">My Tutors</h1>

            {tutors.length === 0 ? (
                <div className="p-10 text-center border-2 border-dashed rounded-xl bg-gray-50">
                    <p className="text-gray-500">You havent added any tutors yet.</p>
                </div>
            ) : (

                <div className="overflow-x-auto shadow-xl rounded-2xl border border-gray-100">
                    <table className="w-full text-left border-collapse bg-white">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold border-b">
                            <tr>
                                <th className="p-5">Image</th>
                                <th className="p-5">Name</th>
                                <th className="p-5">Category</th>
                                <th className="p-5">Fee</th>
                                <th className="p-5">Slots</th>
                                <th className="p-5 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {tutors.map((tutor) => (
                                <tr key={tutor._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        {tutor.photo ? (
                                            <Image src={tutor.photo} alt={tutor.name}
                                                width={20}
                                                height={20}
                                                className="w-14 h-14 rounded-full object-cover border-2 shadow-sm" />
                                        ) : (
                                            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                                                {tutor.name.charAt(0)}
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4 font-semibold text-gray-800">{tutor.name}</td>
                                    <td className="p-4 text-gray-600">{tutor.category}</td>
                                    <td className="p-4 font-medium text-gray-700">${tutor.fee}</td>
                                    <td className="p-4 text-gray-600">{tutor.totalSlot}</td>

                                    {/* বাটন ডিজাইন */}
                                    <td className="p-4">
                                        <div className="flex gap-3 justify-center items-center">
                                            <button
                                                onClick={() => handleEditClick(tutor)}
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all shadow-md"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(tutor._id)}
                                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-all shadow-md"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <UpdateModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                tutor={editingTutor}
                setTutors={setTutors}
                tutors={tutors}
            />
        </div>
    );
};
export default MyTutorsPage;