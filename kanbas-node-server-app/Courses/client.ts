import axios from "axios";

export const receiveAllCourses = async () => {
  const response = await axios.get("http://localhost:4000/api/courses");
  return response.data;
};

export const findCourseById = async (id?: string) => {
  const response = await axios.get(`http://localhost:4000/api/courses/${id}`);
  return response.data;
};

export const createCourse = async (course: any) => {
  const response = await axios.post(
    `http://localhost:4000/api/courses`,
    course
  );
  return response.data;
};

export const updateCourse = async (id, courseData) => {
  const response = await axios.put(
    `http://localhost:4000/api/courses/${id}`,
    courseData
  );
  return response.data;
};

export const deleteCourse = async (courseId: string) => {
  const response = await axios.delete(
    `http://localhost:4000/api/courses/${courseId}`
  );
  return response.data;
};
