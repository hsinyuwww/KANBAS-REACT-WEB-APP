import React, { useEffect, useState } from "react";
import axios from "axios";

function WorkingWithObjects() {
  const ASSIGNMENT_URL = "http://localhost:4000/a5/assignment";
  const MODULE_URL = "http://localhost:4000/a5/module";

  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });

  const fetchAssignment = async () => {
    const response = await axios.get(`${ASSIGNMENT_URL}`);
    setAssignment(response.data);
  };
  const updateTitle = async () => {
    const response = await axios.get(
      `${ASSIGNMENT_URL}/title/${assignment.title}`
    );
    setAssignment(response.data);
  };
  useEffect(() => {
    fetchAssignment();
  }, []);

  const [module, setModule] = useState({
    id: "M101",
    name: "Introduction to Rocket Propulsion",
    description: "Basic principles of rocket propulsion and rocket engines.",
    course: "RS101",
  });

  return (
    <>
      <h3>Working With Objects</h3>
      <h3>Modifying Properties</h3>
      <input
        onChange={(e) =>
          setAssignment({
            ...assignment,
            title: e.target.value,
          })
        }
        value={assignment.title}
        type="text"
      />
      <button onClick={updateTitle}>Update Title to: {assignment.title}</button>
      <button onClick={fetchAssignment}>Fetch Assignment</button>

      <h4>Modifying Module Properties</h4>
      <input
        type="text"
        value={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />
      <a className="btn btn-primary" href={`${MODULE_URL}/name/${module.name}`}>
        Update Module Name{" "}
      </a>
    </>
  );
}

export default WorkingWithObjects;
