const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 mt-15">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Tutor Services Section */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Learning Services</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-blue-400">Mathematics Tutors</a></li>
                        <li><a href="#" className="hover:text-blue-400">Science Experts</a></li>
                        <li><a href="#" className="hover:text-blue-400">Language Classes</a></li>
                        <li><a href="#" className="hover:text-blue-400">Coding Bootcamps</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                    <p className="text-gray-400">Email: support@mediqueue.com</p>
                    <p className="text-gray-400">Phone: +880 123 456 789</p>
                    <p className="text-gray-400">Location: Dhaka, Bangladesh</p>
                </div>

                {/* Social Links */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                        <a href="#" className="text-2xl hover:text-blue-500">𝕏</a> {/* X logo */}
                        <a href="#" className="text-2xl hover:text-blue-600">f</a>
                        <a href="#" className="text-2xl hover:text-pink-600">ig</a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} MediQueue. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;