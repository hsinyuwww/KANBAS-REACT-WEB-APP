import React from "react";
import {
  FaCheckCircle,
  FaEllipsisV,
  FaPlusCircle,
  FaPlus,
  FaTasks,
  FaCaretDown,
} from "react-icons/fa";
import { RxDragHandleDots2 } from "react-icons/rx";
import { PiNotePencilBold } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import assignments from "../../Database/assignments.json";
import "./index.css";

function Assignments() {
  const { courseId } = useParams();
  const assignmentList = assignments.filter(
    (assignment) => assignment.course === courseId
  );
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search for Assignment"
          style={{ maxWidth: "300px" }}
        />
        <div>
          <button className="btn btn-outline-secondary me-2">
            <FaPlus className="me-1" />
            Group
          </button>
          <button className="btn btn-danger me-2">
            <FaPlus className="me-1" />
            Assignment
          </button>
          <button className="btn btn-secondary">
            <FaEllipsisV />
          </button>
        </div>
      </div>
      <hr className="section-divider" />
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> <FaCaretDown />
            ASSIGNMENTS
            <span className="float-end">
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" />
              <FaEllipsisV className="ms-2" />
            </span>
          </div>

          <ul className="list-group">
            {assignmentList.map((assignment) => (
              <li className="list-group-item">
                <RxDragHandleDots2 className="me-2" />
                <PiNotePencilBold className="note-icon" />
                <Link
                  to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                >
                  {assignment.title}
                </Link>
                <span className="float-end">
                  <FaCheckCircle className="text-success" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
}
export default Assignments;
