const UpdateModal = ({ isOpen, onOpenChange, tutor, setTutors, tutors }) => {
    if (!isOpen) return null;

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;

        // সব ইনপুট ফিল্ডের ডেটা একসাথে নেওয়া
        const updatedData = {
            name: form.name.value,
            category: form.category.value,
            totalSlot: parseInt(form.totalSlot.value),
            fee: form.fee.value,
            description: form.description.value,
            image: form.image.value
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/update-tutor/${tutor._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });

        if (res.ok) {
            setTutors(tutors.map(t => t._id === tutor._id ? { ...t, ...updatedData } : t));
            onOpenChange(false);
            alert("Updated successfully!");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
            <div className="bg-white p-6 rounded-lg shadow-xl w-[500px] my-10">
                <h2 className="text-2xl font-bold mb-4">Edit {tutor?.name}</h2>
                <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input name="name" defaultValue={tutor?.name} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Category</label>
                        <input name="category" defaultValue={tutor?.category} className="w-full border p-2 rounded" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Total Slots</label>
                            <input name="totalSlot" type="number" defaultValue={tutor?.totalSlot} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Fee</label>
                            <input name="fee" defaultValue={tutor?.fee} className="w-full border p-2 rounded" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Image URL</label>
                        <input name="image" defaultValue={tutor?.image} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea name="description" defaultValue={tutor?.description} className="w-full border p-2 rounded" rows="3" />
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded font-bold">Save Changes</button>
                        <button type="button" onClick={() => onOpenChange(false)} className="flex-1 bg-gray-300 py-2 rounded font-bold">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default UpdateModal;