import React, { useEffect, useState } from "react";
import * as userCLient from "./client";
import { useNavigate, Link } from "react-router-dom";
import { User } from "../Kanbas/Account/Admin/UserTable";
export default function Profile() {
  const [user, setUser] = useState({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
  });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    const user = await userCLient.profile();
    setUser(user);
  };
  const signout = async () => {
    await userCLient.signout();
    navigate("/Kanbas/Account/signin");
  };
  const updateUser = async () => {
    await userCLient.updateUser(user);
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div>
      <h4>Profile</h4>
      <h5>Welcome, {user.username}</h5>
      <input
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
        value={user.username}
        type="text"
        className="form-control"
        style={{ marginBottom: "5px" }}
      />
      <input
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        value={user.firstName}
        placeholder="First name"
        type="text"
        className="form-control"
        style={{ marginBottom: "5px" }}
      />
      <input
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        value={user.lastName}
        placeholder="Last name"
        type="text"
        className="form-control"
        style={{ marginBottom: "5px" }}
      />
      <input
        onChange={(e) => setUser({ ...user, dob: e.target.value })}
        value={user.dob}
        type="date"
        className="form-control"
        style={{ marginBottom: "5px" }}
      />
      <input
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        value={user.email}
        placeholder="Email address"
        type="text"
        className="form-control"
        style={{ marginBottom: "5px" }}
      />
      <select
        onChange={(e) => setUser({ ...user, role: e.target.value })}
        className="form-control"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <br />

      <button
        className="btn btn-success"
        onClick={updateUser}
        style={{ marginRight: "20px" }}
      >
        Save
      </button>
      <button
        className="btn btn-danger"
        onClick={signout}
        style={{ marginRight: "20px" }}
      >
        Signout
      </button>

      <Link
        to="/Kanbas/Account/Admin"
        className="btn btn-info"
        style={{ marginLeft: "20px" }}
      >
        All Users
      </Link>

      {/* <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre> */}
    </div>
  );
}
