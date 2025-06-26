import SignUp from "./pages/signUp";
import Login from "./pages/login";
import Home from "./pages/Home";
import{Navigate, Route,Routes} from "react-router";
import { useEffect } from "react";
import {useSelector,useDispatch} from "react-redux";
import {checkUser} from "./redux/userSlices/authSlice";

function App() {

  const {isAuthenticated} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(checkUser());
  },[dispatch]);

    return(
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home/> : <Navigate to="/signUp"/>}/>
        <Route path="/signUp" element={isAuthenticated ? <Navigate to="/"/> : <SignUp/>}/>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/"/> : <Login/>}/>
      </Routes>
    )
}

export default App;
