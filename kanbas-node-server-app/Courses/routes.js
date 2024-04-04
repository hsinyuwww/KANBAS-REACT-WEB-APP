import db from "../Database/index.js";
export default function CourseRoutes(app) {
  const receiveAllCourses = (req, res) => {
    res.json(db.courses);
  };
  const findCoursesById = (req, res) => {
    const id = req.params.id;
    const course = db.courses.find((course) => course._id === id);
    if (course) {
      res.json(course);
    } else {
      res.status(404).send("Course not found");
    }
  };

  const createCourse = (req, res) => {
    const course = { ...req.body, _id: new Date().getTime().toString() };
    db.courses.push(course);
    res.json(db.courses);
  };

  const updateCourse = (req, res) => {
    const { id } = req.params;
    const course = req.body;
    db.courses = db.courses.map((c) =>
      c._id === id ? { ...c, ...course } : c
    );
    res.sendStatus(204);
  };

  const deleteCourse = (req, res) => {
    const { id } = req.params;
    db.courses = db.courses.filter((c) => c._id !== id);
    res.sendStatus(204);
  };

  app.get("/api/courses", (req, res) => {
    const courses = db.courses;
    res.send(courses);
  });

  app.get("/api/courses", receiveAllCourses);
  app.get("/api/courses/:id", findCoursesById);
  app.post("/api/courses", createCourse);
  app.put("/api/courses/:id", updateCourse);
  app.delete("/api/courses/:id", deleteCourse);
}
