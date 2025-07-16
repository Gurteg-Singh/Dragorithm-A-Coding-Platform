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
        <nav className="w-full bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left side - Logo/Brand */}
                    <div className="flex-shrink-0 flex items-center">
                        <NavLink to="/" className="text-white text-xl font-bold tracking-tight">
                            DRAGORITHM
                        </NavLink>
                    </div>

                    {/* Right side - Navigation */}
                    <div className="flex items-center space-x-4">
                        {user?.role === 'admin' && (
                            <NavLink to="/admin">
                                <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    Admin Panel
                                </button>
                            </NavLink>
                        )}

                        <button 
                            onClick={handleLogOut}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                            </svg>
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}