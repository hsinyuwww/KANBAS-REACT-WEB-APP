import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import assignments from "../../../Database/assignments.json";
import "./index.css";
function AssignmentEditor() {
  const { assignmentId } = useParams();
  const assignment = assignments.find(
    (assignment) => assignment._id === assignmentId
  );
  const { courseId } = useParams();
  const navigate = useNavigate();
  const handleSave = () => {
    console.log("Actually saving assignment TBD in later assignments");
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };
  return (
    <div className="assignment-editor-container">
      <div className="status-bar d-flex justify-content-end">
        <FaCheckCircle className="text-success me-2" />
        <span>Published</span>
        <button className="btn btn-light ms-2">
          <FaEllipsisV />
        </button>
      </div>
      <hr className="section-divider" />
      <h5>Assignment Name</h5>
      <input value={assignment?.title} className="form-control mb-2" />
      <button onClick={handleSave} className="btn btn-success ms-2 float-end">
        Save
      </button>
      <Link
        to={`/Kanbas/Courses/${courseId}/Assignments`}
        className="btn btn-danger float-end"
      >
        Cancel
      </Link>
    </div>
  );
}
export default AssignmentEditor;
