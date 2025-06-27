import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useSelector,useDispatch} from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../redux/userSlices/authSlice";

export default function SignUp(){
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

    const {register ,handleSubmit,formState : {errors}} = useForm({resolver: zodResolver(signUpSchema)});
    const dispatch = useDispatch();
    function submitData(data){
        dispatch(registerUser(data));
    }

    const {isAuthenticated,loading,error} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if(isAuthenticated){
            navigate("/");
        }
    },[isAuthenticated,navigate]);

    return(
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
                        Welcome to <span className="text-red-600">Dragorithm</span>
                    </h1>
                    
                    <p className="text-xl text-gray-600 mb-8">
                        Where algorithms meet efficiency
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-blue-600 text-3xl font-bold mb-2">500+</div>
                            <div className="text-gray-700">Coding Challenges</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-blue-600 text-3xl font-bold mb-2">24/7</div>
                            <div className="text-gray-700">Practice Sessions</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-blue-600 text-3xl font-bold mb-2">50+</div>
                            <div className="text-gray-700">Algorithm Categories</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-blue-600 text-3xl font-bold mb-2">1M+</div>
                            <div className="text-gray-700">Solutions</div>
                        </div>
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                        <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
                        <div className="w-16 h-1 bg-blue-300 rounded-full"></div>
                        <div className="w-16 h-1 bg-blue-300 rounded-full"></div>
                    </div>
                </div>
            </div>
            {/*bg-gradient-to-r from-blue-500 to-indigo-600*/}
            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-white border-1 border-blue-500 rounded-2xl shadow-lg shadow-blue-500 overflow-hidden">
                    <div className="p-1"></div>
                    <form onSubmit={handleSubmit(submitData)} className="p-8 space-y-5 ">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                            <p className="text-gray-600 mt-2">Start your coding journey today</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="firstName">
                                    First Name
                                </label>
                                <input
                                    className={`w-full px-4 py-3 rounded-lg border ${
                                        errors.firstName ? "border-red-500" : "border-gray-300"
                                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    {...register('firstName')}
                                    type="text"
                                    placeholder="John"
                                />
                                {errors.firstName && (
                                    <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
                                )}
                            </div>
                            
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input
                                    className={`w-full px-4 py-3 rounded-lg border ${
                                        errors.lastName ? "border-red-500" : "border-gray-300"
                                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                    {...register('lastName')}
                                    type="text"
                                    placeholder="Doe"
                                />
                                {errors.lastName && (
                                    <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
                                )}
                            </div>
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
                            
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs font-medium text-gray-700 mb-2">Password requirements:</p>
                                <ul className="grid grid-cols-2 gap-1 text-xs text-gray-500">
                                    <li className="flex items-center">
                                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${errors.password?.message?.includes('8 characters') ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                        8+ characters
                                    </li>
                                    <li className="flex items-center">
                                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${errors.password?.message?.includes('uppercase') ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                        Uppercase letter
                                    </li>
                                    <li className="flex items-center">
                                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${errors.password?.message?.includes('lowercase') ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                        Lowercase letter
                                    </li>
                                    <li className="flex items-center">
                                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${errors.password?.message?.includes('number') ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                        Number
                                    </li>
                                    <li className="flex items-center">
                                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${errors.password?.message?.includes('special character') ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                        Special character
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="pt-3">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-300"
                            >
                                Create Account
                            </button>
                        </div>
                        
                        <div className="text-center mt-5">
                            <p className="text-gray-600 text-sm">
                                Already have an account?{" "}
                                <a href="#" className="text-blue-600 font-medium hover:underline">
                                    Sign in
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

