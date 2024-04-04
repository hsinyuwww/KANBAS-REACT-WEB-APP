import React from "react";
import courses from "../Database/courses";
import {
  Navigate,
  Route,
  Routes,
  useParams,
  useLocation,
  Link,
} from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import "./index.css";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import { FaGlasses } from "react-icons/fa";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import { useState, useEffect } from "react";
import axios from "axios";

function Courses() {
  const { courseId } = useParams();
  const COURSES_API = "http://localhost:4000/api/courses";
  const [course, setCourse] = useState<any>({ _id: "" });
  const location = useLocation(); // Import useLocation hook

  // Function to fetch course data by ID
  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}`);
    setCourse(response.data);
  };

  useEffect(() => {
    if (courseId) {
      findCourseById(courseId);
    }
  }, [courseId]);

  // Breadcrumb Logic
  const pathSections = location.pathname.split("/").filter((x) => x);
  const routeName = pathSections[pathSections.length - 1] || "Home";
  const capitalizedRouteName =
    routeName.charAt(0).toUpperCase() + routeName.slice(1);
  return (
    <div>
      <div className="course-header">
        <h1>
          <HiMiniBars3 className="menu_icon" />
          <span className="breadcrumb">
            {courseId}{" "}
            <span
              className="breadcrumb-separator"
              style={{ color: "rgb(47, 47, 87)" }}
            >
              &gt;
            </span>
            {routeName !== "Home" ? (
              <Link
                to={`/${courseId}/${routeName.toLowerCase()}`}
                className="breadcrumb-link"
              >
                {capitalizedRouteName}
              </Link>
            ) : (
              <span style={{ color: "rgb(47, 47, 87)" }}>Home</span>
            )}
          </span>
        </h1>
        <button className="student-view-button">
          <FaGlasses /> <span>Student View</span>
        </button>
      </div>
      <CourseNavigation />
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: "320px", top: "100px" }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={<AssignmentEditor />}
            />
            <Route path="Grades" element={<Grades />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default Courses;
