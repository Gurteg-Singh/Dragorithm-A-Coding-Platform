import { Link } from "react-router";
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
        <nav className="w-full h-8 bg-yellow-500 flex items-center justify-around">
            <button className="text-black text-3xl" onClick={handleLogOut}>Log Out</button>
            {user.role === 'admin' && <Link to="/admin"><button className="text-black text-3xl">Admin Panel</button></Link>}
        </nav>
    )
}