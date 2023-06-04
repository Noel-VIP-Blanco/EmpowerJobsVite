import React from "react";
import NavBar from "./components/NavBar";
import { Routes, Route, redirect } from "react-router-dom";

//import pages
import Register from "./pages/register/index";
import Login from "./pages/login";
import ListOfJobs from "./pages/list-of-jobs";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<ListOfJobs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
