import db from "../Database/index.js";

const getAllAssignments = (req, res) => {
  res.json(db.assignments);
};
const retrieveAssignmentsForCourse = (req, res) => {
  const { cid } = req.params;
  const assignments = db.assignments.filter(
    (assignment) => assignment.courseId === cid
  );
  res.json(assignments);
};

const retrieveAssignmentById = (req, res) => {
  const { aid } = req.params;
  const assignment = db.assignments.find(
    (assignment) => assignment._id === aid
  );
  if (assignment) {
    res.json(assignment);
  } else {
    res.status(404).send("Assignment not found");
  }
};

const createAssignment = (req, res) => {
  const { cid } = req.params;
  const newAssignment = {
    ...req.body,
    courseId: cid,
    _id: new Date().getTime().toString(),
  };
  db.assignments.push(newAssignment);
  res.status(201).json(newAssignment);
};

const updateAssignment = (req, res) => {
  const { aid } = req.params;
  const index = db.assignments.findIndex(
    (assignment) => assignment._id === aid
  );
  if (index !== -1) {
    db.assignments[index] = {
      ...db.assignments[index],
      ...req.body,
    };
    res.json(db.assignments[index]);
  } else {
    res.status(404).send("Assignment not found");
  }
};

const deleteAssignment = (req, res) => {
  const { aid } = req.params;
  db.assignments = db.assignments.filter((a) => a._id !== aid);
  res.sendStatus(200);
};

const AssignmentRoutes = (app) => {
  app.get("/api/assignments", getAllAssignments);
  app.get("/api/courses/:cid/assignments", retrieveAssignmentsForCourse);
  app.get("/api/assignments/:aid", retrieveAssignmentById);
  app.post("/api/courses/:cid/assignments", createAssignment);
  app.put("/api/assignments/:aid", updateAssignment);
  app.delete("/api/assignments/:aid", deleteAssignment);
};

export default AssignmentRoutes;
