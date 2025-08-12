
export default function Footer(){

    return(
        <footer className="bg-neutral-900 p-2 mt-8">
            <div className="w-full mx-auto bg-neutral-800 rounded-lg text-white p-6">
                <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
                {/* About / Company Info */}
                    <div className="md:w-1/3">
                        <h3 className="font-semibold text-lg mb-2">About Dragorithm</h3>
                        <p className="text-sm text-gray-300">
                        Dragorithm is a coding platform designed to help you master algorithms, prepare for interviews, and grow your programming skills.
                        </p>
                    </div>
                
                {/* Contact Info */}
                    <div className="md:w-1/3">
                        <h3 className="font-semibold text-lg mb-2">Contact Info</h3>
                        <p className="text-sm text-gray-300">Email: support@dragorithm.com</p>
                        <p className="text-sm text-gray-300">Phone: +1 (555) 123-4567</p>
                        <p className="text-sm text-gray-300">Address: 123 Coding St, Toronto, Canada</p>
                    </div>
                
                {/* Social / Misc */}
                    <div className="md:w-1/3">
                        <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
                        <p className="text-sm text-gray-300">Twitter: @dragorithm</p>
                        <p className="text-sm text-gray-300">LinkedIn: Dragorithm Official</p>
                        <p className="text-sm text-gray-300">GitHub: github.com/dragorithm</p>
                    </div>
                </div>
                <div className="mt-6 border-t border-neutral-700 pt-4 text-center text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} Dragorithm. All rights reserved.
                </div>
            </div>
        </footer>


    )
}