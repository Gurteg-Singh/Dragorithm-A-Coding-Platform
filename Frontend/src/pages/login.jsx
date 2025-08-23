import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { loginUser } from "../redux/userSlices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import Navbar from "../components/navbar";
import { clearAuthError } from "../redux/userSlices/authSlice";

export default function Login() {
    const loginSchema = z.object({
        email: z.string().min(1, "Email is required").email("Invalid email address"),
        password: z.string().min(1, "Password is required")
    });

    const { register, handleSubmit, formState: { errors } ,watch} = useForm({ 
        resolver: zodResolver(loginSchema),
        mode : "onChange"
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    function submitData(data) {
        dispatch(loginUser(data));
    }

    const {isAuthenticated,loading,error} = useSelector((state)=>state.auth);

    useEffect(()=>{
        dispatch(clearAuthError());
    },[]);

    useEffect(()=>{
        if(isAuthenticated){
            navigate("/allProblems");
        }
    },[isAuthenticated,navigate]);

    // Add background animation styles
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
            
            /* Background animation styles for login */
            @keyframes gradient-x {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            @keyframes float {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-10px) rotate(5deg); }
            }
            @keyframes pulse-slow {
                0%, 100% { opacity: 0.2; transform: scale(1); }
                50% { opacity: 0.25; transform: scale(1.05); }
            }
            @keyframes pulse-slower {
                0%, 100% { opacity: 0.15; transform: scale(1); }
                50% { opacity: 0.2; transform: scale(1.03); }
            }
            .animate-gradient-x {
                background-size: 200% 200%;
                animation: gradient-x 15s ease infinite;
            }
            .animate-float {
                animation: float 10s ease-in-out infinite;
            }
            .animate-pulse-slow {
                animation: pulse-slow 8s ease-in-out infinite;
            }
            .animate-pulse-slower {
                animation: pulse-slower 12s ease-in-out infinite;
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-900 flex flex-col relative overflow-hidden">
            {/* Background Animation Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Subtle moving gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/5 to-indigo-900/10 animate-gradient-x"></div>
                
                {/* Animated grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                
                {/* Floating particles */}
                <div className="absolute inset-0 animate-float">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-purple-500/20 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.5}s`,
                                transform: `scale(${0.5 + Math.random() * 1})`
                            }}
                        ></div>
                    ))}
                </div>
                
                {/* Animated blobs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full filter blur-[100px] opacity-15 animate-pulse-slow"></div>
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600 rounded-full filter blur-[120px] opacity-10 animate-pulse-slower"></div>
            </div>
            
            <Navbar />
            
            <div className="flex-1 flex flex-col lg:flex-row items-center justify-center relative z-10">
                {/* Left Side - Branding */}
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
                    <div className="max-w-lg text-center mb-10 lg:mb-0">
                        <div className="flex justify-center mb-8">
                            <img 
                                src="https://res.cloudinary.com/dybdedi4e/image/upload/v1755042762/Dragorithm.435Z-removebg-preview_zjwxtc.png" 
                                alt="Dragorithm Logo"
                                className="w-40 h-40"
                            />
                        </div>
                        
                        <h1 className="text-5xl font-bold text-white mb-6">
                            Welcome to <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Dragorithm</span>
                        </h1>
                        
                        <div className="space-y-6">
                            <p className="text-2xl text-neutral-300">
                                Where Algorithms Meet Excellence
                            </p>
                            
                            <p className="text-xl text-neutral-400 italic">
                                "The only way to learn to code is to code, and the best place is here."
                            </p>
                            
                            <div className="flex justify-center mt-8">
                                <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
                    <div className="w-full max-w-md bg-neutral-800/80 backdrop-blur-sm rounded-2xl border border-neutral-700 shadow-lg overflow-hidden">
                        <form onSubmit={handleSubmit(submitData)} className="p-8 space-y-6">
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold text-white">Log In</h2>
                                <p className="text-neutral-400 mt-2">Continue your coding journey</p>
                            </div>
                            
                            <div>
                                <label className="block text-neutral-300 text-sm font-medium mb-1" htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    className={`w-full px-4 py-3 rounded-lg bg-neutral-900 border ${
                                        errors.email ? "border-red-500" : "border-neutral-700"
                                    } text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    {...register('email')}
                                    type="email"
                                    placeholder="john.doe@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-neutral-300 text-sm font-medium mb-1" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className={`w-full px-4 py-3 rounded-lg bg-neutral-900 border ${
                                        errors.password ? "border-red-500" : "border-neutral-700"
                                    } text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    {...register('password')}
                                    type="password"
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                                )}
                                {error && (
                                    <p className="mt-1 text-sm text-red-400">{error}</p>
                                )}
                                
                                <div className="flex justify-end mt-2">
                                    <a href="#" className="text-sm text-blue-400 hover:text-blue-300 hover:underline">
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>
                            
                            <div className="pt-3">
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all duration-300"
                                >
                                    Log In
                                </button>
                            </div>
                            
                            <div className="text-center mt-6">
                                <p className="text-neutral-400 text-sm">
                                    Don't have an account?{" "}
                                    <Link to="/signUp" className="text-blue-400 font-medium hover:text-blue-300 hover:underline">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}