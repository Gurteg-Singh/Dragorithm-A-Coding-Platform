import { Link, NavLink } from "react-router";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logOutUser } from "../redux/userSlices/authSlice";

export default function Navbar(){

    const {user,isAuthenticated,loading} = useSelector((state)=>state.auth);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogOut(){
        dispatch(logOutUser());
        navigate('/login');
    }

    return(
        <nav className="w-full bg-neutral-900 text-white p-2 text-xl fixed">
            <div className="w-full bg-neutral-800 flex justify-between items-center p-2 rounded-2xl">
                <div className="pl-4">
                    DRAGORITHM
                </div>
                <div className="flex justify-center items-center">
                    <NavLink to="" className="border-r-2 border-white flex justify-center items-center pl-4 pr-4">Home</NavLink>
                    <NavLink to="" className="border-r-2 border-white flex justify-center items-center pl-4 pr-4">Problems</NavLink>
                    <NavLink to="" className="border-r-2 border-white flex justify-center items-center pl-4 pr-4">About</NavLink>
                    <NavLink to="" className="flex justify-center items-center pl-4 pr-4">My Profile</NavLink>
                    {user?.role === "admin" && <NavLink className="border-l-2 border-white flex justify-center items-center pl-4 pr-4">Admin</NavLink>}
                </div>
                {
                    isAuthenticated ? 
                    <div className="flex justify-center items-center pr-4">
                        <NavLink onClick={handleLogOut} className="bg-red-600 flex items-center justify-center p-1 rounded-xl pl-2 pr-2">LogOut</NavLink>
                    </div>
                    :
                    <div className="flex justify-center items-center pr-4">
                        <NavLink className="flex items-center justify-center p-1 rounded-xl bg-white text-black pl-2 pr-2">Login</NavLink>
                        <NavLink className="flex items-center justify-center p-1 rounded-xl border-2 border-white pl-2 pr-2">Sign Up</NavLink>
                    </div>
                }
            </div>
        </nav>
    )
}