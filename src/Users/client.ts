import axios from "axios";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(
    `http://localhost:4000/api/users/${user._id}`,
    user
  );
  return response.data;
};
export const getAllUsers = async () => {
  const response = await axiosWithCredentials.get(
    "http://localhost:4000/api/users"
  );
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axiosWithCredentials.post(
    "http://localhost:4000/api/users",
    user
  );
  return response.data;
};

export const deleteUser = async (id: String) => {
  const response = await axiosWithCredentials.delete(
    `http://localhost:4000/api/users/${id}`
  );
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(
    "http://localhost:4000/api/users/signup",
    user
  );
  return response.data;
};
export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(
    "http://localhost:4000/api/users/signin",
    credentials
  );
  return response.data;
};
export const profile = async () => {
  const response = await axiosWithCredentials.get(
    "http://localhost:4000/api/users/profile"
  );
  return response.data;
};
export const signout = async () => {
  const response = await axiosWithCredentials.get(
    "http://localhost:4000/api/users/signout"
  );
  return response.data;
};
