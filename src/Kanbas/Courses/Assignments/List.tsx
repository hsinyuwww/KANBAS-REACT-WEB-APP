import React, { useEffect, useState } from "react";
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
import { Link, useParams, useNavigate } from "react-router-dom";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignment,
} from "./reducer";
import * as client from "./client";
import { RootState } from "../../store";
import { AiOutlinePlus } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";

function AssignmentList() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignmentList = useSelector(
    (state: RootState) => state.assignmentsReducer.assignments
  );

  const handleAddAssignment = async () => {
    const newAssignment = {
      title: "New Assignment",
      description: "New Assignment Description",
    };
    try {
      const response = await client.createAssignment(courseId, newAssignment);

      dispatch(addAssignment(response));
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    console.log(`Attempting to delete assignment with ID: ${assignmentId}`);
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this assignment?"
    );

    if (shouldDelete) {
      client
        .deleteAssignment(assignmentId)
        .then((response) => {
          console.log(
            `Assignment with ID: ${assignmentId} has been deleted successfully.`,
            response
          );
          dispatch(deleteAssignment(assignmentId));
        })
        .catch((error) => {
          console.error(
            `Error deleting assignment with ID: ${assignmentId}`,
            error
          );
        });
    } else {
      console.log("Deletion was cancelled by the user.");
    }
  };

  useEffect(() => {
    client.findAssignmentsForCourse(courseId).then((assignments) => {
      dispatch(setAssignment(assignments));
    });
  }, [courseId]);

  return (
    <div className="wd-flex-grow-1">
      <input placeholder="Search for Assignment" />
      <div className="wd-flex-row-container-1 wd-flex-grow-1">
        <button className="gray-button">
          <AiOutlinePlus />
          Group
        </button>
        <button className="red-button" onClick={handleAddAssignment}>
          <AiOutlinePlus />
          Assignment
        </button>
        <button className="gray-button">
          <BiDotsVerticalRounded />
        </button>
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
              <li className="list-group-item" key={assignment._id}>
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
                  <button
                    onClick={() => handleDeleteAssignment(assignment._id)}
                    className="btn btn-danger btn-sm ms-2"
                  >
                    Delete
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
export default AssignmentList;
