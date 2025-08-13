// components/Navbar.js
import { Link, NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logOutUser } from "../redux/userSlices/authSlice";
import { useState, useEffect } from "react";

export default function Navbar() {
    const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    function handleLogOut() {
        dispatch(logOutUser())
        .unwrap()
        .then(() => {
            navigate('/login', { replace: true });
        });
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`w-full bg-neutral-900 text-white p-2 text-xl sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
            <div className={`w-full flex justify-between items-center p-2 rounded-2xl transition-all duration-300 ${scrolled ? 'bg-neutral-800' : 'bg-neutral-900'}`}>
                <div className="pl-4 flex items-center justify-center gap-2">
                    <img className="h-14" src="https://res.cloudinary.com/dybdedi4e/image/upload/v1755042762/Dragorithm.435Z-removebg-preview_zjwxtc.png" alt="Dragorithm Logo"/>
                    <p className="flex justify-center items-center font-bold text-2xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">DRAGORITHM</p>
                </div>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex justify-center items-center space-x-1">
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                            `px-4 py-2 rounded-xl transition-all duration-300 hover:bg-neutral-700 ${isActive ? 'bg-neutral-700 font-bold' : ''}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/allProblems" 
                        className={({ isActive }) => 
                            `px-4 py-2 rounded-xl transition-all duration-300 hover:bg-neutral-700 ${isActive ? 'bg-neutral-700 font-bold' : ''}`
                        }
                    >
                        Problems
                    </NavLink>
                    <NavLink 
                        to="/about" 
                        className={({ isActive }) => 
                            `px-4 py-2 rounded-xl transition-all duration-300 hover:bg-neutral-700 ${isActive ? 'bg-neutral-700 font-bold' : ''}`
                        }
                    >
                        About
                    </NavLink>
                    <NavLink 
                        to="/myProfile" 
                        className={({ isActive }) => 
                            `px-4 py-2 rounded-xl transition-all duration-300 hover:bg-neutral-700 ${isActive ? 'bg-neutral-700 font-bold' : ''}`
                        }
                    >
                        My Profile
                    </NavLink>
                    {
                        user?.role === "admin" && 
                        <NavLink 
                            to="/admin" 
                            className={({ isActive }) => 
                                `px-4 py-2 rounded-xl transition-all duration-300 hover:bg-neutral-700 ${isActive ? 'bg-neutral-700 font-bold' : ''}`
                            }
                        >
                            Admin
                        </NavLink>
                    }
                </div>
                
                {/* Mobile Menu Button */}
                <div className="md:hidden pr-4">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white focus:outline-none"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
                
                {/* Auth Buttons - Desktop */}
                <div className="hidden md:flex justify-center items-center pr-4 gap-3">
                    {
                        isAuthenticated ? 
                        <button 
                            onClick={handleLogOut} 
                            className="bg-gradient-to-r from-red-600 to-red-800 flex items-center justify-center p-2 rounded-xl pl-4 pr-4 hover:from-red-700 hover:to-red-900 transition-all duration-300 shadow-lg shadow-red-900/30"
                        >
                            Logout
                        </button>
                        :
                        <>
                            <NavLink 
                                to="/login" 
                                className="flex items-center justify-center p-2 rounded-xl bg-gradient-to-r from-white to-gray-200 text-black pl-4 pr-4 hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-lg shadow-white/20"
                            >
                                Login
                            </NavLink>
                            <NavLink 
                                to="/signUp" 
                                className="flex items-center justify-center p-2 rounded-xl border-2 border-white pl-4 pr-4 hover:bg-neutral-700 transition-all duration-300"
                            >
                                Sign Up
                            </NavLink>
                        </>
                    }
                </div>
            </div>
            
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-neutral-800 rounded-xl mt-2 mx-2 p-4 animate-fadeIn">
                    <div className="flex flex-col space-y-3">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => 
                                `px-4 py-2 rounded-xl transition-all duration-300 hover:bg-neutral-700 ${isActive ? 'bg-neutral-700 font-bold' : ''}`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/allProblems" 
                            className={({ isActive }) => 
                                `px-4 py-2 rounded-xl transition-all duration-300 hover:bg-neutral-700 ${isActive ? 'bg-neutral-700 font-bold' : ''}`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Problems
                        </NavLink>
                        <NavLink 
                            to="/about" 
                            className={({ isActive }) => 
                                `px-4 py-2 rounded-xl transition-all duration-300 hover:bg-neutral-700 ${isActive ? 'bg-neutral-700 font-bold' : ''}`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </NavLink>
                        <NavLink 
                            to="/myProfile" 
                            className={({ isActive }) => 
                                `px-4 py-2 rounded-xl transition-all duration-300 hover:bg-neutral-700 ${isActive ? 'bg-neutral-700 font-bold' : ''}`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            My Profile
                        </NavLink>
                        {user?.role === "admin" && (
                            <NavLink 
                                to="/admin" 
                                className={({ isActive }) => 
                                    `px-4 py-2 rounded-xl transition-all duration-300 hover:bg-neutral-700 ${isActive ? 'bg-neutral-700 font-bold' : ''}`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Admin
                            </NavLink>
                        )}
                        
                        <div className="pt-4 border-t border-neutral-700 mt-2">
                            {isAuthenticated ? (
                                <button 
                                    onClick={() => {
                                        handleLogOut();
                                        setIsMenuOpen(false);
                                    }} 
                                    className="w-full bg-gradient-to-r from-red-600 to-red-800 flex items-center justify-center p-2 rounded-xl hover:from-red-700 hover:to-red-900 transition-all duration-300 shadow-lg shadow-red-900/30"
                                >
                                    Logout
                                </button>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <NavLink 
                                        to="/login" 
                                        className="flex items-center justify-center p-2 rounded-xl bg-gradient-to-r from-white to-gray-200 text-black hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-lg shadow-white/20"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink 
                                        to="/signUp" 
                                        className="flex items-center justify-center p-2 rounded-xl border-2 border-white hover:bg-neutral-700 transition-all duration-300"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Sign Up
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}