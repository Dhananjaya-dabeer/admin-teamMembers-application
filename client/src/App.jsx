import { useState } from "react";
import "./App.css";
import SIgnUp_InPage from "./pages/SIgnUp_InPage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AdminPage from "./pages/AdminPage";
import MemberPage from "./pages/MemberPage";
import DescriptionPage from "./pages/DescriptionPage";
import ProductContextProvider from "./context/ProductContextProvider";
import PendingPage from "./pages/PendingPage";
import RejectedPage from "./pages/RejectedPage";
import ApprovedPage from "./pages/ApprovedPage";

function App() {

  return (
   <ProductContextProvider>
     <Router>
      <Routes>
        <Route path={"/"} element = {<SIgnUp_InPage />}/>
        <Route path={"/admin"} element = {<AdminPage />}/>
        <Route path={"/team-member"} element = {<MemberPage />}/>
        <Route path={"/description"} element = {<DescriptionPage />}/>
        <Route path={"/pendingPage"} element = {<PendingPage />}/>
        <Route path={"/rejectedPage"} element = {<RejectedPage />}/>
        <Route path={"/ApprovedPage"} element = {<ApprovedPage />}/>
      </Routes>
    </Router>
   </ProductContextProvider>
  );
}

export default App;
