import { NavLink } from "react-router";
import Navbar from "../components/navbar";
import { useEffect } from "react";
import Footer from "../components/footer";

export default function LandingPage(){

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
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return(
        <div className="custom-scrollbar w-full min-h-screen flex flex-col bg-neutral-900 relative">
            <div className="min-h-screen w-full flex flex-col">
                <Navbar/>
                <div className="bg-neutral-900 w-full flex-1 text-white flex flex-col justify-center items-center gap-3 pb-8">
                    <p className="text-7xl" style={{ textShadow: '2px 2px 4px gray' }}>Conquer Data Structure & Algorithms</p>
                    <p className="text-6xl" style={{ textShadow: '2px 2px 4px gray' }}>Ace Your Coding Interviews</p>
                    <p className="text-xl">Dragorithm offers challenges from beginner basics to advanced algorithmic concepts for real-world problem solving.</p>
                    <p className="text-xl">Sharpen your logic, track progress, and code with skillful confidence.</p>
                    <div className="flex justify-center items-center gap-4">
                        <NavLink><div className="p-2 bg-white text-black text-xl rounded-xl flex justify-center items-center">Get Started</div></NavLink>
                        <NavLink><div className="p-2 border-2 border-white rounded-xl flex justify-center items-center">Learn More</div></NavLink>
                    </div>
                </div>
            </div>
            <div className="bg-neutral-900 w-full text-white flex flex-col items-center justify-start pb-8 gap-8">
                <h1 className="text-5xl mb-12">Why Choose Us?</h1>
                <div className="w-[60%] flex items-stretch justify-between p-2 border-2 border-white rounded-2xl">
                    <div className="w-[40%] p-2">
                        <p className="text-xl font-bold">1. Extensive Problem Library</p>
                        <p className="pl-3">"Explore a vast collection of thousands of coding problems spanning beginner to advanced levels. Each problem is 
                            thoughtfully selected to cover key data structures, algorithms, and real interview scenarios, ensuring you’re 
                            fully prepared for any technical challenge."
                        </p>
                    </div>
                    <div className="w-[40%]">
                        IMG
                    </div>
                </div>

                <div className="w-[60%] flex items-stretch justify-between p-2 border-2 border-white rounded-2xl">
                    <div className="w-[40%]">
                        IMG
                    </div>
                    <div className="w-[40%] p-2">
                        <p className="text-xl font-bold">2. AI-BOT : DRAGO</p>
                        <p className="pl-3">"Meet DRAGO, your personal AI assistant available 24/7 to help you clear doubts instantly. Whether you’re 
                            stuck on a tricky problem or need clarification on concepts, DRAGO guides you step-by-step with clear, 
                            easy-to-understand explanations to keep your learning momentum strong."
                        </p>
                    </div>
                </div>

                <div className="w-[60%] flex items-stretch justify-between p-2 border-2 border-white rounded-2xl">
                    <div className="w-[40%] p-2">
                        <p className="text-xl font-bold">3. Step-by-Step Video Solutions</p>
                        <p className="pl-3">"Gain deeper understanding through detailed video walkthroughs created by expert developers. These videos break 
                            down problem-solving approaches, highlight optimization techniques, and share coding best practices, so you 
                            learn effectively and avoid common pitfalls."
                        </p>
                    </div>
                    <div className="w-[40%] ">
                        IMG
                    </div>
                </div>

                <div className="w-[60%] flex items-stretch justify-between p-2 border-2 border-white rounded-2xl">
                    <div className="w-[40%]">
                        IMG
                    </div>
                    <div className="w-[40%] p-2">
                        <p className="text-xl font-bold">4. Multi-Language Coding Support</p>
                        <p className="pl-3">"Write and test your solutions in multiple popular programming languages such as C++, Java, JavaScript, Python, 
                            and more. Dragorithm’s flexible environment ensures you can practice with the language you’re most comfortable 
                            with or want to master for interviews."
                        </p>
                    </div>
                </div>
            </div>

            {/*Footer*/}      
            <div>
                <Footer/>
            </div>      
        </div>
    )
}