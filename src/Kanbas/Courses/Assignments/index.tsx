import React from "react";
import AssignmentList from "./List";

import "./index.css";
import * as client from "./client";
import {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignment,
} from "./reducer";

function Assignments() {
  return (
    <div>
      <AssignmentList />
    </div>
  );
}

export default Assignments;
