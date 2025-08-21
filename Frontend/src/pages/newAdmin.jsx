import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../utils/axiosClient";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { Eye, EyeOff, ArrowLeft, UserPlus, CheckCircle, XCircle, Loader } from "lucide-react";

export default function NewAdmin() {
    const newAdminSchema = z.object({
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

    const { register, handleSubmit, formState: { errors } ,reset} = useForm({
        resolver: zodResolver(newAdminSchema),
        mode: "onChange"
    });
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [registering, setRegistering] = useState(false);

    const navigate = useNavigate();

    function leavePage() {
        setSuccess(null);
        navigate('/admin');
    }

    async function createAdmin(data) {
        try {
            setRegistering(true);
            const response = await axiosClient.post("/user/admin/register", data);
            setSuccess(response?.data?.message || "New Admin Created Successfully");
        } catch (err) {
            setError(err?.response?.data?.message);
        } finally {
            setRegistering(false);
        }
    }

    return (
        <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-neutral-800 rounded-2xl border border-neutral-700 p-6 shadow-xl">
                {/* Header */}
                <div className="flex items-center mb-6">
                    <button 
                        onClick={() => navigate('/admin')}
                        className="p-2 mr-3 rounded-lg bg-neutral-700 hover:bg-neutral-600 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold">Create New Admin</h1>
                        <p className="text-neutral-400 text-sm">Add a new administrator to the system</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(createAdmin)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-400">First Name</label>
                            <input
                                {...register("firstName")}
                                placeholder="John"
                                type="text"
                                className="w-full bg-neutral-700 border border-neutral-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.firstName && (
                                <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-neutral-400">Last Name</label>
                            <input
                                {...register("lastName")}
                                placeholder="Doe"
                                type="text"
                                className="w-full bg-neutral-700 border border-neutral-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.lastName && (
                                <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-neutral-400">Email</label>
                        <input
                            {...register("email")}
                            placeholder="admin@example.com"
                            type="email"
                            className="w-full bg-neutral-700 border border-neutral-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-neutral-400">Password</label>
                        <div className="relative">
                            <input
                                {...register("password")}
                                placeholder="••••••••"
                                type={show ? "text" : "password"}
                                className="w-full bg-neutral-700 border border-neutral-600 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShow(!show)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-white"
                            >
                                {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={registering}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center disabled:opacity-50"
                    >
                        {registering ? (
                            <Loader className="h-5 w-5 animate-spin mr-2" />
                        ) : (
                            <UserPlus className="h-5 w-5 mr-2" />
                        )}
                        {registering ? "Creating Admin..." : "Register Admin"}
                    </button>
                </form>

                {/* Password Requirements */}
                <div className="mt-6 p-4 bg-neutral-700/50 rounded-xl">
                    <h3 className="text-sm font-medium text-neutral-300 mb-2">Password Requirements:</h3>
                    <ul className="text-xs text-neutral-400 space-y-1">
                        <li>• At least 8 characters</li>
                        <li>• One uppercase letter</li>
                        <li>• One lowercase letter</li>
                        <li>• One number</li>
                        <li>• One special character</li>
                    </ul>
                </div>
            </div>

            {/* Loading Modal */}
            {registering && (
                <div className="fixed inset-0  backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-neutral-800 rounded-2xl border border-neutral-700 p-6 max-w-md w-full shadow-xl">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <div className="animate-spin">
                                    <Loader className="h-6 w-6 text-blue-500" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Creating Admin</h3>
                            <p className="text-neutral-300">Please wait while we register the new administrator...</p>
                        </div>
                        
                        <div className="flex justify-center">
                            <div className="flex space-x-1">
                                <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce"></div>
                                <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                <div className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Modal */}
            {error && (
                <div className="fixed inset-0  backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-neutral-800 rounded-2xl border border-neutral-700 p-6 max-w-md w-full shadow-xl">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <XCircle className="h-6 w-6 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Error</h3>
                            <p className="text-neutral-300">{error}</p>
                        </div>
                        
                        <div className="flex justify-center">
                            <button 
                                onClick={() => {setError(null),reset()}} 
                                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl transition-colors"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {success && (
                <div className="fixed inset-0  backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-neutral-800 rounded-2xl border border-neutral-700 p-6 max-w-md w-full shadow-xl">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="h-6 w-6 text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Success</h3>
                            <p className="text-neutral-300">{success}</p>
                        </div>
                        
                        <div className="flex justify-center">
                            <button 
                                onClick={leavePage} 
                                className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl transition-colors"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}