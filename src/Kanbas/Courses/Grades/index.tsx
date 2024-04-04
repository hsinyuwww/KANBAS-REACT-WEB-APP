import React from "react";
import {
  FaFilter,
  FaDownload,
  FaUpload,
  FaCog,
  FaCaretDown,
  FaFileExport,
  FaFileImport,
} from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import assignments from "../../Database/assignments";
import enrollments from "../../Database/enrollments";
import grades from "../../Database/grades";
import users from "../../Database/users";
import { useParams } from "react-router-dom";
import "./index.css";

function Grades() {
  const { courseId } = useParams();
  const as = assignments.filter((assignment) => assignment.course === courseId);
  const es = enrollments.filter((enrollment) => enrollment.course === courseId);
  return (
    <div>
      <div className="gradebook-header">
        <h5 className="grade-title">
          Gradesbook <FaCaretDown />
        </h5>
        <div className="gradebook-actions">
          <button className="btn btn-outline-secondary">
            <FaFileImport /> Import
          </button>
          <button className="btn btn-outline-secondary">
            <FaFileExport /> Export <FaCaretDown />
          </button>
          <button className="btn btn-outline-secondary">
            <FaCog />
          </button>
        </div>
      </div>
      <div className="search-container">
        <div className="search-column">
          <label htmlFor="searchStudents">Student Names</label>
          <div className="input-group">
            <span className="input-group-text">
              <BsSearch />
            </span>
            <input
              type="text"
              id="searchStudents"
              className="form-control"
              placeholder="Search Students"
            />
            <button className="btn dropdown-toggle"></button>
          </div>
        </div>
        <div className="search-column">
          <label htmlFor="searchAssignments">Assignment Names</label>
          <div className="input-group">
            <span className="input-group-text">
              <BsSearch />
            </span>
            <input
              type="text"
              id="searchAssignments"
              className="form-control"
              placeholder="Search Assignments"
            />
            <button className="btn dropdown-toggle"></button>
          </div>
        </div>
      </div>
      <div>
        <button className="btn btn-outline-secondary">
          <FaFilter /> Apply Filters
        </button>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Student Name</th>
              {as.map((assignment) => (
                <th key={assignment._id}>{assignment.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {es.map((enrollment) => {
              const user = users.find((user) => user._id === enrollment.user);
              return (
                <tr key={enrollment._id}>
                  <td>
                    {user?.firstName} {user?.lastName}
                  </td>
                  {as.map((assignment) => {
                    const grade = grades.find(
                      (grade) =>
                        grade.student === enrollment.user &&
                        grade.assignment === assignment._id
                    );
                    return <td key={assignment._id}>{grade?.grade || ""}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Grades;
