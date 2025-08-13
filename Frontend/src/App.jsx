import SignUp from "./pages/signUp";
import Login from "./pages/login";
import AllProblems from "./pages/allProblems";
import{Navigate, Route,Routes} from "react-router";
import { useEffect } from "react";
import {useSelector,useDispatch} from "react-redux";
import {checkUser} from "./redux/userSlices/authSlice";
import AdminPanel from "./pages/adminPanel";
import CreateProblem from "./pages/createProblem";
import ProblemPage from "./pages/problemPage";
import ProblemDescription from "./components/problemDescription";
import ProblemEditorial from "./components/problemEditorial";
import ProblemSolution from "./components/problemSolution";
import ProblemSubmissions from "./components/problemSubmissions";
import ProblemAI from "./components/problemAI";
import EditorialPanel from "./pages/editorialPanel";
import EditorialUpload from "./pages/editorialUpload";
import LandingPage from "./pages/landingPage";
import UpdateDeletePanel from "./pages/updateDeletePanel";
import UpdateProblem from "./pages/updateProblem";

function App() {

  const {isAuthenticated,user,loading} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(checkUser());
  },[dispatch]);

    return(
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/allProblems" element={isAuthenticated ? <AllProblems/> : <Navigate to="/login"/>}/>
        <Route path="/signUp" element={isAuthenticated ? <Navigate to="/"/> : <SignUp/>}/>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/"/> : <Login/>}/>
        <Route path="/admin" element={isAuthenticated ? user.role === 'admin' ? <AdminPanel/> : <Navigate to="/"/> : <Navigate to="/login"/>}/>
        <Route path="/admin/createProblem" element={isAuthenticated ? user.role === 'admin' ? <CreateProblem/> : <Navigate to="/"/> : <Navigate to="/login"/>}/>
        <Route path="/admin/updateProblem/:id" element={isAuthenticated ? user.role === 'admin' ? <UpdateProblem/> : <Navigate to="/"/> : <Navigate to="/login"/>}/>
        <Route path="/admin/editorial" element={isAuthenticated ? user.role === 'admin' ? <EditorialPanel/> : <Navigate to="/"/> : <Navigate to="/login"/>}/>
        <Route path="/admin/updateOrDeleteProblem" element={isAuthenticated ? user.role === 'admin' ? <UpdateDeletePanel/> : <Navigate to="/"/> : <Navigate to="/login"/>}/>
        <Route path="/admin/editorial/upload/:id" element={isAuthenticated ? user.role === 'admin' ? <EditorialUpload/> : <Navigate to="/"/> : <Navigate to="/login"/>}/>
        <Route path="/problem/:id" element={isAuthenticated ? <ProblemPage/> : <Navigate to="/"/>}>
          <Route index element={<Navigate to="description" replace />}></Route>
          <Route path="description" element={<ProblemDescription/>}></Route>
          <Route path="editorial" element={<ProblemEditorial/>}></Route>
          <Route path="solution" element={<ProblemSolution/>}></Route>
          <Route path="submissions" element={<ProblemSubmissions/>}></Route>
          <Route path="ai" element={<ProblemAI/>}></Route>
        </Route>
      </Routes>
    )
}

export default App;


