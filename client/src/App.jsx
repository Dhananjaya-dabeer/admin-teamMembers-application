import { useState } from "react";
import "./App.css";
import SIgnUp_InPage from "./pages/SIgnUp_InPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AdminPage from "./pages/AdminPage";
import MemberPage from "./pages/MemberPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path={"/"} element = {<SIgnUp_InPage />}/>
        <Route path={"/admin"} element = {<AdminPage />}/>
        <Route path={"/team-member"} element = {<MemberPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
