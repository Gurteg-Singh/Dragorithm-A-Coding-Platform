import { Link } from "react-router";
import Navbar from "../components/navbar";
import { Plus, Edit, Trash, Video, UserPlus } from "lucide-react";

export default function AdminPanel() {
    const options = [
        {
            title: "Create Problem",
            description: "Create a new Problem for users.",
            nav: "/admin/createProblem",
            icon: Plus
        },
        {
            title: "Update Problem",
            description: "Make changes to an existing problem",
            nav: "",
            icon: Edit
        },
        {
            title: "Delete Problem",
            description: "Delete an existing problem",
            nav: "",
            icon: Trash
        },
        {
            title: "Upload/Remove Editorial",
            description: "Add and remove editorial for existing problems.",
            nav: "/admin/editorial",
            icon: Video
        },
        {
            title: "New Admin",
            description: "Create a new admin account.",
            nav: "",
            icon: UserPlus
        }
    ];

    return (
        <div className="min-h-screen w-screen flex flex-col bg-gray-900">
            <Navbar />
            <div className="flex-1 w-full p-6 sm:p-10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-bold text-gray-100">Admin Dashboard</h1>
                        <p className="text-gray-400 mt-2">Manage platform content and settings</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {options.map((val, index) => {
                            const Icon = val.icon;
                            return (
                                <Link 
                                    to={val?.nav} 
                                    key={index}
                                    className="group cursor-pointer"
                                >
                                    <div className="h-full flex flex-col justify-between p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-lg transition-all duration-300 group-hover:border-indigo-500 group-hover:shadow-indigo-500/20">
                                        <div className="text-center">
                                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-900/30 group-hover:bg-indigo-900/50 transition-colors mb-5">
                                                <Icon className="h-8 w-8 text-indigo-400" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-100 mb-2">{val.title}</h3>
                                            <p className="text-gray-400 text-sm">{val.description}</p>
                                        </div>
                                        
                                        <div className="mt-6 text-center">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-900/30 text-indigo-400 group-hover:bg-indigo-900/50">
                                                Access Panel
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}