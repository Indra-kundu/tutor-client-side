"use client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddTutorPage = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        // নতুন ফিল্ডসহ ডাটা এখন সার্ভারে যাবে
        const res = await fetch('http://localhost:5000/tutor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            toast.success("Tutor added successfully!");
            reset();
        } else {
            toast.error("Something went wrong!");
        }
    };

    const inputStyle = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 backdrop-blur-md bg-white/60";
    const labelStyle = "block text-sm font-semibold text-gray-700 mb-1";

    return (
        <div className="max-w-5xl mx-auto my-10 p-16 rounded-3xl shadow-2xl border border-white/20 backdrop-blur-xl bg-white/70">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Add New Tutor</h2>
            <p className="text-gray-500 mb-8">Enter the tutor details carefully to proceed.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 w-full">

                {/* Name */}
                <div>
                    <label className={labelStyle}>Tutor Name *</label>
                    <input {...register("name", { required: "Name is required" })} className={inputStyle} placeholder="Full Name" />
                </div>

                {/* Photo URL */}
                <div>
                    <label className={labelStyle}>Photo URL *</label>
                    <input {...register("photo", { required: true })} className={inputStyle} placeholder="Image link" />
                </div>

                {/* Category */}
                <div>
                    <label className={labelStyle}>Subject / Category *</label>
                    <select {...register("category", { required: true })} className={inputStyle}>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                    </select>
                </div>

                {/* নতুন ফিল্ডসমূহ */}
                <div>
                    <label className={labelStyle}>Available Days and Time *</label>
                    <input {...register("availableDays", { required: true })} className={inputStyle} placeholder="e.g. Sun - Thu 5:00 PM - 8:00 PM" />
                </div>

                <div>
                    <label className={labelStyle}>Total Slot *</label>
                    <input type="number" {...register("totalSlot", { required: true })} className={inputStyle} placeholder="Number of slots" />
                </div>

                <div>
                    <label className={labelStyle}>Institution *</label>
                    <input {...register("institution", { required: true })} className={inputStyle} placeholder="Institution name" />
                </div>

                <div>
                    <label className={labelStyle}>Experience *</label>
                    <textarea {...register("experience", { required: true })} className={`${inputStyle} h-24`} placeholder="Briefly describe your teaching experience" />
                </div>
                {/* নতুন ফিল্ডসমূহ শেষ */}

                {/* আগের ফিল্ডসমূহ */}
                <div>
                    <label className={labelStyle}>Hourly Fee ($) *</label>
                    <input type="number" {...register("fee", { required: true })} className={inputStyle} placeholder="e.g. 50" />
                </div>

                <div>
                    <label className={labelStyle}>Location (Area/City) *</label>
                    <input {...register("location", { required: true })} className={inputStyle} placeholder="Enter location" />
                </div>

                <div>
                    <label className={labelStyle}>Teaching Mode *</label>
                    <select {...register("mode", { required: true })} className={inputStyle}>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Both">Both</option>
                    </select>
                </div>

                <div>
                    <label className={labelStyle}>Session Start Date *</label>
                    <input type="date" {...register("date", { required: true })} className={inputStyle} />
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg transform hover:-translate-y-1">
                    Submit Tutor Details
                </button>
            </form>
        </div>
    );
};

export default AddTutorPage;