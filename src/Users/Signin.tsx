import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as userCLient from "./client";
export default function Signin() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const signin = async () => {
    try {
      await userCLient.signin(user);
      navigate("/Kanbas/Account/profile");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Signin</h1>
      <input
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        value={user.username}
        type="text"
        className="form-control"
        placeholder="Username"
        style={{ marginBottom: "5px" }}
      />
      <input
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        value={user.password}
        type="password"
        className="form-control"
        placeholder="Password"
      />
      <button
        className="btn btn-primary"
        onClick={signin}
        style={{ marginRight: "10px", marginTop: "5px" }}
      >
        Signin
      </button>
      <Link
        to="/Kanbas/Account/Signup"
        className="btn btn-primary"
        style={{ marginRight: "10px", marginTop: "5px" }}
      >
        Signup
      </Link>
    </div>
  );
}
