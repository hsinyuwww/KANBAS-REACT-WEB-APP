import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { addAssignment, updateAssignment } from "../assignmentsReducer";
import "./index.css";

interface Assignment {
  _id: string;
  title: string;
  description: string;
  points: number;
  dueDate?: string;
  availableFromDate?: string;
  availableUntilDate?: string;
  course: string;
}

function AssignmentEditor() {
  const { assignmentId, courseId } = useParams<{
    assignmentId: string;
    courseId: string;
  }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignments = useSelector(
    (state: RootState) => state.assignments.assignments
  );
  const editingAssignment = useSelector((state: RootState) =>
    assignmentId !== "new"
      ? state.assignments.assignments.find((a: any) => a._id === assignmentId)
      : null
  );

  const [assignment, setAssignment] = useState<Assignment>({
    _id: "",
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFromDate: "",
    availableUntilDate: "",
    course: courseId || "",
  });

  useEffect(() => {
    if (editingAssignment) {
      const updatedAssignment: Assignment = {
        ...editingAssignment,
        description: editingAssignment.description || "",
        points: editingAssignment.points || 100,
      };
      setAssignment(updatedAssignment);
    }
  }, [editingAssignment]);

  const handleSave = () => {
    const assignmentToSave: Assignment = {
      ...assignment,
      _id:
        assignmentId === "new"
          ? new Date().getTime().toString()
          : assignment._id,
    };

    if (assignmentId === "new") {
      dispatch(addAssignment(assignmentToSave));
    } else {
      dispatch(updateAssignment(assignmentToSave));
    }
    navigate(`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setAssignment((prev) => ({ ...prev, [name]: value }));
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
      <input
        name="title"
        value={assignment?.title}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Assignment Title"
      />
      <textarea
        name="description"
        value={assignment?.description}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Assignment Description"
      />
      <div className="form-group">
        <label htmlFor="title">Assignment Name</label>
        <input
          name="title"
          value={assignment.title}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="New Assignment Title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Assignment Description</label>
        <textarea
          name="description"
          value={assignment.description}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="New Assignment Description"
        />
      </div>

      <div className="form-group">
        <label htmlFor="points">Points</label>
        <input
          type="number"
          name="points"
          value={assignment.points.toString()}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Points"
        />
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Due</label>
        <input
          type="date"
          name="dueDate"
          value={assignment.dueDate}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Due Date"
        />
      </div>

      <div className="form-group">
        <label htmlFor="availableFromDate">Available from</label>
        <input
          type="date"
          name="availableFromDate"
          value={assignment.availableFromDate}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Available From Date"
        />
      </div>

      <div className="form-group">
        <label htmlFor="availableUntilDate">Until</label>
        <input
          type="date"
          name="availableUntilDate"
          value={assignment.availableUntilDate}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Available Until Date"
        />
      </div>

      <div className="d-flex justify-content-end">
        <button onClick={handleSave} className="btn btn-success">
          Save
        </button>
        <Link
          to={`/Kanbas/Courses/${courseId}/Assignments`}
          className="btn btn-danger ms-2"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default AssignmentEditor;
