// src/components/AdditionalSection.jsx
const AdditionalSection = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section 1: Why Choose Us */}
                <div className="mb-20 text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12">Why Choose EduBridge?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold mb-4 text-blue-600">Expert Tutors</h3>
                            <p className="text-gray-600">Our tutors are verified professionals with years of experience in their respective fields.</p>
                        </div>
                        <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold mb-4 text-blue-600">Flexible Schedule</h3>
                            <p className="text-gray-600">Learn at your own pace with our flexible online and offline session options.</p>
                        </div>
                        <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold mb-4 text-blue-600">Secure Payments</h3>
                            <p className="text-gray-600">We ensure your transactions are safe and transparent with every booking.</p>
                        </div>
                    </div>
                </div>

                {/* Section 2: How It Works */}
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12">How It Works</h2>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-10">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">1</div>
                            <p className="font-semibold">Browse Tutors</p>
                        </div>
                        <div className="h-0.5 w-20 bg-blue-200 hidden md:block"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">2</div>
                            <p className="font-semibold">Book a Session</p>
                        </div>
                        <div className="h-0.5 w-20 bg-blue-200 hidden md:block"></div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">3</div>
                            <p className="font-semibold">Start Learning</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AdditionalSection;