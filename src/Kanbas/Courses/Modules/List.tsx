import React, { useEffect, useState } from "react";
import "./index.css";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaPlusCircle,
  FaCaretDown,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useParams } from "react-router-dom";
import modules from "../../Database/modules";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./reducer";
import { KanbasState } from "../../store";
import * as client from "./client";

function ModuleList() {
  const { courseId } = useParams();
  const moduleList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules
  );
  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );
  const dispatch = useDispatch();
  const modulesList = moduleList.filter((module) => module.course === courseId);
  const [selectedModule, setSelectedModule] = useState(modulesList[0]);

  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };
  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };

  const handleAddModule = () => {
    client.createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
    });
  };

  return (
    <>
      <div className="button-container">
        <button className="bttn">Collapse All</button>
        <button className="bttn">Expand All</button>
        <button className="bttn">View Progress</button>
        <button className="bttn">
          <FaCheckCircle style={{ color: "green" }} />
          Publish All <FaCaretDown />
        </button>
        <button className="btn btn-danger">+ Module</button>
        <button className="bttn">
          <BsThreeDotsVertical />
        </button>
      </div>
      <hr className="section-divider" />
      <ul className="list-group wd-modules">
        <li className="list-group-item add-module-form">
          <input
            className="module-name-input"
            placeholder="New Module"
            value={module.name}
            onChange={(e) =>
              dispatch(setModule({ ...module, name: e.target.value }))
            }
          />
          <textarea
            className="module-description-text"
            placeholder="New Description"
            value={module.description}
            onChange={(e) =>
              dispatch(setModule({ ...module, description: e.target.value }))
            }
          />
          <button className="add-module-btn" onClick={handleAddModule}>
            Add
          </button>
          <button onClick={handleUpdateModule}>Update</button>
        </li>

        {moduleList
          .filter((module) => module.course === courseId)
          .map((module) => (
            <li className="list-group-item">
              <div className="module-info">
                <h5 className="module-title">{module.name}</h5>
                <p className="module-description">{module.description}</p>
                <div className="module-footer">
                  <span className="module-id">{module._id}</span>
                  <div className="module-actions">
                    <button
                      className="delete-module-btn"
                      onClick={() => handleDeleteModule(module._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="edit-module-btn"
                      onClick={() => dispatch(setModule(module))}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <FaEllipsisV className="me-2" />
                {module.name}
                <span className="float-end">
                  <FaCheckCircle className="text-success" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </div>

              <ul className="list-group">
                {module.lessons?.map((lesson: any) => (
                  <li className="list-group-item">
                    <FaEllipsisV className="me-2" />
                    {lesson.name}
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </>
  );
}
export default ModuleList;
