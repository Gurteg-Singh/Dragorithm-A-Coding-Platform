import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../redux/userSlices/authSlice";
import { Link } from "react-router";
import Navbar from "../components/navbar";
import { clearAuthError } from "../redux/userSlices/authSlice";

export default function SignUp() {
    const signUpSchema = z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().min(1, "Email is required").email("Invalid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number")
            .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
    });

    const {register, handleSubmit, formState: {errors},watch} = useForm({
        resolver: zodResolver(signUpSchema),
        mode : "onChange"
    });

    const dispatch = useDispatch();
    
    function submitData(data) {
        dispatch(registerUser(data));
    }

    const {isAuthenticated, loading,error} = useSelector((state)=>state.auth);
    const navigate = useNavigate();

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
            
            /* Background animation styles */
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

    useEffect(()=>{
        dispatch(clearAuthError());
    },[]);
    
    useEffect(() => {
        if(isAuthenticated) {
            navigate("/allProblems");
        }
    }, [isAuthenticated, navigate]);

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
            
            <div className="flex-1 flex flex-col lg:flex-row items-center justify-center py-4 relative z-10">
                {/* Left Side - Branding */}
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 lg:p-8">
                    <div className="max-w-lg text-center mb-6 lg:mb-0">
                        <div className="flex justify-center mb-4">
                            <img 
                                src="https://res.cloudinary.com/dybdedi4e/image/upload/v1755042762/Dragorithm.435Z-removebg-preview_zjwxtc.png" 
                                alt="Dragorithm Logo"
                                className="w-32 h-40"
                            />
                        </div>
                        
                        <h1 className="text-4xl font-bold text-white mb-4">
                            Join <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Dragorithm</span>
                        </h1>
                        
                        <div className="space-y-3">
                            <p className="text-xl text-neutral-300">
                                Where Coders Become Champions
                            </p>

                            <p className="text-xl text-neutral-400 italic">
                                "The only way to learn to code is to code, and the best place is here."
                            </p>
                            
                            <div className="flex justify-center mt-4">
                                <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-neutral-800/80 backdrop-blur-sm rounded-2xl border border-neutral-700 shadow-lg overflow-hidden">
                        <form onSubmit={handleSubmit(submitData)} className="p-6 space-y-4">
                            <div className="text-center mb-4">
                                <h2 className="text-2xl font-bold text-white">Create Account</h2>
                                <p className="text-neutral-400 text-sm mt-1">Start your coding journey today</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-neutral-300 text-xs font-medium mb-1" htmlFor="firstName">
                                        First Name
                                    </label>
                                    <input
                                        className={`w-full px-3 py-2 rounded-lg bg-neutral-900 border ${
                                            errors.firstName ? "border-red-500" : "border-neutral-700"
                                        } text-white text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent`}
                                        {...register('firstName')}
                                        type="text"
                                        placeholder="John"
                                    />
                                    {errors.firstName && (
                                        <p className="mt-1 text-xs text-red-400">{errors.firstName.message}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-neutral-300 text-xs font-medium mb-1" htmlFor="lastName">
                                        Last Name
                                    </label>
                                    <input
                                        className={`w-full px-3 py-2 rounded-lg bg-neutral-900 border ${
                                            errors.lastName ? "border-red-500" : "border-neutral-700"
                                        } text-white text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent`}
                                        {...register('lastName')}
                                        type="text"
                                        placeholder="Doe"
                                    />
                                    {errors.lastName && (
                                        <p className="mt-1 text-xs text-red-400">{errors.lastName.message}</p>
                                    )}
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-neutral-300 text-xs font-medium mb-1" htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    className={`w-full px-3 py-2 rounded-lg bg-neutral-900 border ${
                                        errors.email ? "border-red-500" : "border-neutral-700"
                                    } text-white text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent`}
                                    {...register('email')}
                                    type="email"
                                    placeholder="john.doe@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-neutral-300 text-xs font-medium mb-1" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    className={`w-full px-3 py-2 rounded-lg bg-neutral-900 border ${
                                        errors.password ? "border-red-500" : "border-neutral-700"
                                    } text-white text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent`}
                                    {...register('password')}
                                    type="password"
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
                                )}
                                {error && (
                                    <p className="mt-1 text-xs text-red-400">{error}</p>
                                )}
                                
                                <div className="mt-2 p-2 bg-neutral-900/50 rounded-lg border border-neutral-700 text-xs">
                                    <p className="font-medium text-neutral-400 mb-1">Password requirements:</p>
                                    <ul className="grid grid-cols-2 gap-1 text-neutral-500">
                                        <li className="flex items-center">
                                            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${errors.password?.message?.includes('8 characters') ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                            8+ characters
                                        </li>
                                        <li className="flex items-center">
                                            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${errors.password?.message?.includes('uppercase') ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                            Uppercase letter
                                        </li>
                                        <li className="flex items-center">
                                            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${errors.password?.message?.includes('lowercase') ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                            Lowercase letter
                                        </li>
                                        <li className="flex items-center">
                                            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${errors.password?.message?.includes('number') ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                            Number
                                        </li>
                                        <li className="flex items-center">
                                            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${errors.password?.message?.includes('special character') ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                            Special character
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg shadow-md transition-all duration-300"
                                >
                                    Create Account
                                </button>
                            </div>
                            
                            <div className="text-center mt-4">
                                <p className="text-neutral-400 text-xs">
                                    Already have an account?{" "}
                                    <Link to="/login" className="text-blue-400 font-medium hover:text-blue-300 hover:underline">
                                        Log in
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