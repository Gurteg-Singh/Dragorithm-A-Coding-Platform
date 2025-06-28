import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { loginUser } from "../redux/userSlices/authSlice";
import {useSelector,useDispatch} from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";

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

    const {isAuthenticated,loading,error} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if(isAuthenticated){
            navigate("/");
        }
    },[isAuthenticated,navigate]);

    if (loading) {
        return <div className="h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-white flex flex-col lg:flex-row">
            {/* Left Side - Branding */}
            <div className="w-full lg:w-1/2 bg-black flex flex-col items-center justify-center p-8">
                <div className="max-w-md text-center">
                    <div className="flex justify-center mb-8">
                        <div className="w-48 h-48 rounded-full bg-blue-50 flex items-center justify-center">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 flex items-center justify-center text-gray-500">
                                {/* Replace with your logo */}
                                <span className="text-2xl font-bold">D</span>
                            </div>
                        </div>
                    </div>
                    
                    <h1 className="text-4xl font-bold text-blue-600 mb-4">
                        Welcome Back to <span className="text-red-600">Dragorithm</span>
                    </h1>
                    
                    <p className="text-xl text-gray-600 mb-8">
                        Continue your coding journey
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-blue-600 text-3xl font-bold mb-2">500+</div>
                            <div className="text-gray-700">Coding Problems</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-blue-600 text-3xl font-bold mb-2">98%</div>
                            <div className="text-gray-700">Success Rate</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-blue-600 text-3xl font-bold mb-2">24/7</div>
                            <div className="text-gray-700">Community Support</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-blue-600 text-3xl font-bold mb-2">10K+</div>
                            <div className="text-gray-700">Active Coders</div>
                        </div>
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                        <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
                        <div className="w-16 h-1 bg-blue-300 rounded-full"></div>
                        <div className="w-16 h-1 bg-blue-300 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-white border-1 border-blue-500 rounded-2xl shadow-lg shadow-blue-500 overflow-hidden">
                    <div className="p-1"></div>
                    <form onSubmit={handleSubmit(submitData)} className="p-8 space-y-6">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-800">Log In</h2>
                            <p className="text-gray-600 mt-2">Access your coding dashboard</p>
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.email ? "border-red-500" : "border-gray-300"
                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                {...register('email')}
                                type="email"
                                placeholder="john.doe@example.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="password">
                                Password
                            </label>
                            <input
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.password ? "border-red-500" : "border-gray-300"
                                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                {...register('password')}
                                type="password"
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                            )}
                            
                            <div className="flex justify-end mt-2">
                                <a href="#" className="text-sm text-blue-600 hover:underline">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>
                        
                        <div className="pt-3">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-300"
                            >
                                Log In
                            </button>
                        </div>
                        
                        <div className="text-center mt-6">
                            <p className="text-gray-600 text-sm">
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-blue-600 font-medium hover:underline">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}