import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

function SignUp(){
    const {register ,handleSubmit,formState : {errors}} = useForm();

    function submitData(data){

    }
    return(
        <div>
            <form onSubmit={handleSubmit(submitData)}>
                <div>
                    <p>Dragorithm</p>
                </div>
                <div>
                    <label className="" htmlFor="firstName">First Name : </label>
                    <input {...register('firstName')} type="text" placeholder="Enter your first name"></input>
                </div>
                <div>
                    <label className="" htmlFor="lastName">Last Name : </label>
                    <input {...register('lastName')} type="text" placeholder="Enter your last name"></input>
                </div>
                <div>
                    <label className="" htmlFor="email">E-mail : </label>
                    <input {...register('email')} type="email" placeholder="@gmail.com"></input>
                </div>
                <div>
                    <label className="" htmlFor="password">Password : </label>
                    <input {...register('password')} type="password" placeholder="Enter your password"></input>
                </div>
                <div>
                    <button className="">Submit</button>
                </div>
            </form>
        </div>
    )
}

