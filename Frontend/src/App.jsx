import SignUp from "./pages/signUp";
import Login from "./pages/login";
import Home from "./pages/Home";
import{Route,Routes} from "react-router";

function App() {
    return(
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    )
}

export default App
