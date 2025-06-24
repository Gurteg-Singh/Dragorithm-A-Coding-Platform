import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

export default function Login(){
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

    function submitData(data){

    }
    return(
        <div className="w-full h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit(submitData)} className="flex flex-col items-center">
                <div>
                    <p>Dragorithm</p>
                </div>
                <div>
                    <label className="font-bold text-2xl" htmlFor="email">E-mail : </label>
                    <input className="border-2 border-amber-400 m-4" {...register('email')} type="email" placeholder="@gmail.com"></input>
                    {errors.email ? <span>{errors.email.message}</span> : null}
                </div>
                <div>
                    <label className="font-bold text-2xl" htmlFor="password">Password : </label>
                    <input className="border-2 border-amber-400 m-4" {...register('password')} type="password" placeholder="Enter your password"></input>
                    {errors.password ? <span>{errors.password.message}</span> : null}
                </div>
                <div>
                    <button className="bg-blue-700 text-white">Login</button>
                </div>
            </form>
        </div>
    )
}