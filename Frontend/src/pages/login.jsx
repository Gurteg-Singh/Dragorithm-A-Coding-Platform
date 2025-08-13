import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { loginUser } from "../redux/userSlices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import Navbar from "../components/navbar";

export default function Login() {
    const loginSchema = z.object({
        email: z.string().min(1, "Email is required").email("Invalid email address"),
        password: z.string().min(1, "Password is required")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({ 
        resolver: zodResolver(loginSchema) 
    });
    const dispatch = useDispatch();
    
    function submitData(data) {
        dispatch(loginUser(data));
    }

    const {isAuthenticated,loading} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if(isAuthenticated){
            navigate("/allProblems");
        }
    },[isAuthenticated,navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-900 flex flex-col">
            <Navbar />
            
            <div className="flex-1 flex flex-col lg:flex-row items-center justify-center">
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
                    <div className="w-full max-w-md bg-neutral-800 rounded-2xl border border-neutral-700 shadow-lg overflow-hidden">
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