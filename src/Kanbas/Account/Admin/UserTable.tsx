import React, { useEffect, useState } from "react";
import {
  BsTrash3Fill,
  BsPlusCircleFill,
  BsPencil,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import * as userCLient from "../../../Users/client";

export type User = {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
};

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
  });
  const getUsers = async () => {
    const users = await userCLient.getAllUsers();
    setUsers(users);
  };
  const addUser = async () => {
    const newUser = await userCLient.createUser(user);
    setUsers([...users, newUser]);
  };
  const updateUser = async () => {
    await userCLient.updateUser(user);
    setUsers(users.map((u) => (u._id === user._id ? user : u)));
  };
  const deleteUser = async (user: User) => {
    await userCLient.deleteUser(user._id);
    setUsers(users.filter((u) => u._id !== user._id));
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <h1>User Table</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
          </tr>
          <tr>
            <td>
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                style={{
                  border: "solid #ccc",
                  width: "200px",
                  height: "40px",
                  borderRadius: "8px",
                }}
              />
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                style={{
                  border: "solid #ccc",
                  width: "200px",
                  height: "40px",
                  borderRadius: "8px",
                }}
              />
            </td>
            <td>
              <input
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
                style={{
                  border: "solid #ccc",
                  width: "200px",
                  height: "40px",
                  borderRadius: "8px",
                }}
              />
            </td>
            <td>
              <input
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                style={{
                  border: "solid #ccc",
                  width: "200px",
                  height: "40px",
                  borderRadius: "8px",
                }}
              />
            </td>
            <td>
              <select
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                style={{
                  border: "solid #ccc",
                  width: "200px",
                  height: "40px",
                  borderRadius: "8px",
                }}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </select>
            </td>
            <td className="text-nowrap">
              <BsFillCheckCircleFill
                onClick={updateUser}
                className="me-2 text-success fs-1 text"
              />
              <BsPlusCircleFill
                onClick={addUser}
                className="text-success fs-1 text"
              />
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.role}</td>
              <td className="text-nowrap">
                <button className="btn btn-danger me-2">
                  <BsTrash3Fill onClick={() => deleteUser(user)} />
                </button>
                <button className="btn btn-warning me-2">
                  <BsPencil onClick={() => setUser(user)} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
