import { Link } from "react-router";

export default function AdminPanel(){

    
    
    return(
        <div>
            <div>
                <Link to="/admin/createProblem"><button className="border-2 border-amber-400 m-2">Create Problem</button></Link>
            </div>
            <div>
                <button>Update Problem</button>
            </div>
            <div>
                <button>Delete Problem</button>
            </div>
        </div>
    )
}