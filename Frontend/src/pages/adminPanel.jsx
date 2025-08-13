import { Link } from "react-router";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Plus, Edit, Trash, Video, UserPlus } from "lucide-react";

export default function AdminPanel() {
    const options = [
        {
            title: "Create Problem",
            description: "Create a new Problem for users.",
            nav: "/admin/createProblem",
            icon: Plus,
            color: "from-blue-600 to-indigo-600"
        },
        {
            title: "Update/Delete Problem",
            description: "Make changes to an existing problem",
            nav: "/admin/updateOrDeleteProblem",
            icon: Edit,
            color: "from-emerald-600 to-green-600"
        },
        {
            title: "Upload/Remove Editorial",
            description: "Add and remove editorial for existing problems.",
            nav: "/admin/editorial",
            icon: Video,
            color: "from-violet-600 to-purple-600"
        },
        {
            title: "New Admin",
            description: "Create a new admin account.",
            nav: "",
            icon: UserPlus,
            color: "from-amber-600 to-orange-600"
        }
    ];

    return (
        <div className="custom-scrollbar min-h-screen w-full flex flex-col bg-neutral-900">
            <Navbar />
            
            <div className="flex-1 w-full p-6 sm:p-8 flex items-center justify-center">
                <div className="max-w-5xl w-full">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px gray' }}>
                            Admin Dashboard
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-4"></div>
                        <p className="text-neutral-400 max-w-2xl mx-auto">
                            Manage platform content with these administration tools
                        </p>
                    </div>
                    
                    {/* Admin Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {options.map((val, index) => {
                            const Icon = val.icon;
                            return (
                                <Link 
                                    to={val?.nav} 
                                    key={index}
                                    className="group cursor-pointer transform transition-transform duration-300 hover:-translate-y-1.5"
                                >
                                    <div className="h-full flex flex-col justify-between p-6 bg-neutral-800 rounded-2xl border-2 border-neutral-700 shadow-xl transition-all duration-300 group-hover:border-indigo-500 group-hover:shadow-indigo-900/30">
                                        {/* Card Header with Gradient */}
                                        <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${val.color} rounded-t-2xl`}></div>
                                        
                                        <div className="mt-2 text-center">
                                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-neutral-900/50 mb-5">
                                                <div className={`p-3 rounded-lg bg-gradient-to-br ${val.color}`}>
                                                    <Icon className="h-6 w-6 text-white" />
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                                                {val.title}
                                            </h3>
                                            <p className="text-neutral-400 text-sm">{val.description}</p>
                                        </div>
                                        
                                        <div className="mt-6 text-center">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-700/50 text-neutral-300 group-hover:bg-indigo-900/50 group-hover:text-indigo-300 transition-colors">
                                                Access Panel
                                                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}