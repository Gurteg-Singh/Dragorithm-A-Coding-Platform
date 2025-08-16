import { NavLink } from "react-router";
import Navbar from "../components/navbar";
import { useEffect } from "react";
import Footer from "../components/footer";

export default function LandingPage() {

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            .custom-scrollbar::-webkit-scrollbar {
                width: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: #2a2a2a;
                border-radius: 5px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #3d3d3d;
                border-radius: 5px;
                border: 2px solid #2a2a2a;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #4a4a4a;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .fade-in {
                animation: fadeIn 0.8s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return(
        <div className="custom-scrollbar w-full min-h-screen flex flex-col bg-neutral-900">
            {/* Navbar */}
            <Navbar/>
            
            {/* Hero Section */}
            <div className="min-h-screen w-full flex flex-col relative overflow-hidden pt-16">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-[100px] opacity-20"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600 rounded-full filter blur-[120px] opacity-15"></div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center items-center gap-6 pb-8 px-4 relative z-10">
                    <div className="text-center max-w-4xl">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Conquer Data Structure & Algorithms
                        </h1>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
                            Ace Your Coding Interviews
                        </h2>
                        <p className="text-base md:text-xl text-neutral-300 mb-4">
                            Dragorithm offers challenges from beginner basics to advanced algorithmic concepts for real-world problem solving.
                        </p>
                        <p className="text-base md:text-xl text-neutral-300 mb-8">
                            Sharpen your logic, track progress, and code with skillful confidence.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <NavLink to="/problems">
                            <button className="px-6 py-3 sm:px-8 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-base sm:text-lg font-medium rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-500/20">
                                Get Started
                            </button>
                        </NavLink>
                        <NavLink to="/about">
                            <button className="px-6 py-3 sm:px-8 sm:py-3 border-2 border-white text-white text-base sm:text-lg font-medium rounded-xl hover:bg-white/10 transition-all">
                                Learn More
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
            
            {/* Features Section */}
            <div className="w-full text-white flex flex-col items-center justify-start py-16 px-4 gap-16">
                <h1 className="text-3xl md:text-4xl font-bold text-center">
                    Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Dragorithm</span>?
                </h1>

                <div className="w-full max-w-6xl flex flex-col gap-12">
                    {/* Feature 1 */}
                    <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700 hover:border-blue-500 transition-all duration-300 fade-in">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/2">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl font-bold text-blue-400">1</span>
                                    </div>
                                    <h3 className="text-xl font-bold">Extensive Problem Library</h3>
                                </div>
                                <p className="text-neutral-300">
                                    "Explore a vast collection of thousands of coding problems spanning beginner to advanced levels. Each problem is 
                                    thoughtfully selected to cover key data structures, algorithms, and real interview scenarios, ensuring you’re 
                                    fully prepared for any technical challenge."
                                </p>
                            </div>
                            <div className="md:w-1/2 flex items-center justify-center">
                                <img 
                                    className="w-full h-64 object-cover rounded-xl border border-neutral-700"
                                    src="https://res.cloudinary.com/dybdedi4e/image/upload/v1755332557/Screenshot_2025-08-16_042016_oypdwi.png" 
                                    alt="Problem Library"
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Feature 2 */}
                    <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700 hover:border-purple-500 transition-all duration-300 fade-in">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/2 flex items-center justify-center order-2 md:order-1">
                                <img 
                                    className="w-full h-64 object-cover rounded-xl border border-neutral-700"
                                    src="https://res.cloudinary.com/dybdedi4e/image/upload/v1755332557/Screenshot_2025-08-16_042016_oypdwi.png" 
                                    alt="AI Assistant"
                                />
                            </div>
                            <div className="md:w-1/2 order-1 md:order-2">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl font-bold text-purple-400">2</span>
                                    </div>
                                    <h3 className="text-xl font-bold">AI-BOT : DRAGO</h3>
                                </div>
                                <p className="text-neutral-300">
                                    "Meet DRAGO, your personal AI assistant available 24/7 to help you clear doubts instantly. Whether you’re 
                                    stuck on a tricky problem or need clarification on concepts, DRAGO guides you step-by-step with clear, 
                                    easy-to-understand explanations to keep your learning momentum strong."
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Feature 3 */}
                    <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700 hover:border-green-500 transition-all duration-300 fade-in">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/2">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl font-bold text-green-400">3</span>
                                    </div>
                                    <h3 className="text-xl font-bold">Step-by-Step Video Solutions</h3>
                                </div>
                                <p className="text-neutral-300">
                                    "Gain deeper understanding through detailed video walkthroughs created by expert developers. These videos break 
                                    down problem-solving approaches, highlight optimization techniques, and share coding best practices, so you 
                                    learn effectively and avoid common pitfalls."
                                </p>
                            </div>
                            <div className="md:w-1/2 flex items-center justify-center">
                                <img 
                                    className="w-full h-64 object-cover rounded-xl border border-neutral-700"
                                    src="https://res.cloudinary.com/dybdedi4e/image/upload/v1755332557/Screenshot_2025-08-16_042016_oypdwi.png" 
                                    alt="Video Solutions"
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Feature 4 */}
                    <div className="bg-neutral-800 p-6 rounded-2xl border border-neutral-700 hover:border-yellow-500 transition-all duration-300 fade-in">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/2 flex items-center justify-center order-2 md:order-1">
                                <img 
                                    className="w-full h-64 object-cover rounded-xl border border-neutral-700"
                                    src="https://res.cloudinary.com/dybdedi4e/image/upload/v1755332557/Screenshot_2025-08-16_042016_oypdwi.png" 
                                    alt="Multi-language Support"
                                />
                            </div>
                            <div className="md:w-1/2 order-1 md:order-2">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                                        <span className="text-2xl font-bold text-yellow-400">4</span>
                                    </div>
                                    <h3 className="text-xl font-bold">Multi-Language Coding Support</h3>
                                </div>
                                <p className="text-neutral-300">
                                    "Write and test your solutions in multiple popular programming languages such as C++, Java, JavaScript, Python, 
                                    and more. Dragorithm’s flexible environment ensures you can practice with the language you’re most comfortable 
                                    with or want to master for interviews."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer/>    
        </div>
    )
}