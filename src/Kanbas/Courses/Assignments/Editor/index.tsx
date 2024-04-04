import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import db from "../../../Database";
import "./index.css";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, setAssignment, updateAssignment } from "../reducer";
import { KanbasState } from "../../../store";
import * as client from "../client";

function AssignmentEditor() {
  const { assignmentId, courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const assignment = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignment
  );

  const handleSave = async () => {
    console.log("assignmentId:", assignmentId);

    if (!assignmentId || !assignment) {
      console.error("Assignment ID or assignment data is missing");
      return;
    }
    console.log("Saving assignment with ID:", assignmentId);
    console.log("Assignment data:", assignment);
    try {
      const updatedAssignment = await client.updateAssignment(
        assignmentId,
        assignment
      );
      console.log("Updated assignment response:", updatedAssignment);
      dispatch(updateAssignment(updatedAssignment));
      navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    } catch (error) {
      console.error("Error updating assignment:", error);
    }
  };

  return (
    <div className="wd-flex-row-container">
      <div className="wd-flex">
        <button className="gray-button" disabled>
          <AiFillCheckCircle />
          Published
        </button>
        <button className="gray-button">
          <BiDotsVerticalRounded />
        </button>
      </div>
      <hr />
      <div className="assignment">
        <b>Assignment Name</b>

        <input
          value={assignment?.title}
          className="form-control mb-2"
          onChange={(e) =>
            dispatch(setAssignment({ ...assignment, title: e.target.value }))
          }
        />
        <textarea
          className="form-control"
          value={assignment?.description}
          onChange={(e) =>
            dispatch(
              setAssignment({ ...assignment, description: e.target.value })
            )
          }
        ></textarea>
        <br />
        <div className="wd-flex1">
          <b>Points</b>
          <input value={assignment.points} className="form-control"></input>
        </div>
        <div className="wd-flex1">
          <b>Assign</b>
          <div className="form-control">
            Due
            <input className="form-control date w-50" type="date" />
            <table>
              <tbody>
                <tr>
                  <td>Available from</td>
                  <td>Until</td>
                </tr>
                <tr>
                  <td>
                    <input className="form-control date" type="date" />
                  </td>
                  <td>
                    <input className="form-control date" type="date" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <hr />
        <div className="wd-flex">
          <Link to={`/Kanbas/Courses/${courseId}/Assignments`} className="btn">
            Cancel
          </Link>
          <button onClick={handleSave} className="btn btn-danger">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AssignmentEditor;
