import SignUp from "./pages/signUp";
import Login from "./pages/login";
import Home from "./pages/home";
import{Navigate, Route,Routes} from "react-router";
import { useEffect } from "react";
import {useSelector,useDispatch} from "react-redux";
import {checkUser} from "./redux/userSlices/authSlice";
import AdminPanel from "./pages/adminPanel";
import CreateProblem from "./pages/createProblem";
function App() {

  const {isAuthenticated,user,loading} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(checkUser());
  },[dispatch]);

    return(
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home/> : <Navigate to="/login"/>}/>
        <Route path="/signUp" element={isAuthenticated ? <Navigate to="/"/> : <SignUp/>}/>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/"/> : <Login/>}/>
        <Route path="/admin" element={isAuthenticated ? user.role === 'admin' ? <AdminPanel/> : <Navigate to="/"/> : <Navigate to="/login"/>}/>
        <Route path="/admin/createProblem" element={isAuthenticated ? user.role === 'admin' ? <CreateProblem/> : <Navigate to="/"/> : <Navigate to="/login"/>}/>
      </Routes>
    )
}

export default App;


