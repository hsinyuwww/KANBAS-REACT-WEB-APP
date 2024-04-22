import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as userCLient from "./client";

export default function Signup() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await userCLient.signup(user);
      navigate("/Kanbas/Account/profile");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h3>Signup</h3>
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
        className="btn btn-warning"
        onClick={signup}
        style={{ marginRight: "10px", marginTop: "5px" }}
      >
        Signup
      </button>
      <Link
        to="/Kanbas/Account/signin"
        className="btn btn-primary"
        style={{ marginRight: "10px", marginTop: "5px" }}
      >
        Signin
      </Link>
    </div>
  );
}
