import Signin from "../../Users/Signin";
import Signup from "../../Users/Signup";
import Profile from "../../Users/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import UserTable from "./Admin/UserTable";
import Admin from "./Admin";
export default function Account() {
  return (
    <div className="container-fluid">
      <h1>Account</h1>
      <Routes>
        <Route path="/" element={<Navigate to="/Kanbas/Account/Signin" />} />
        <Route path="Signin" element={<Signin />} />
        <Route path="Signup" element={<Signup />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="Admin" element={<Admin />} />
        
      </Routes>
    </div>
  );
}
