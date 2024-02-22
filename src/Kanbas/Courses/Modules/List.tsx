import React, { useState } from "react";
import "./index.css";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaPlusCircle,
  FaCaretDown,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useParams } from "react-router-dom";
import modules from "../../Database/modules.json";

function ModuleList() {
  const { courseId } = useParams();
  const modulesList = modules.filter((module) => module.course === courseId);

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
        {modulesList.map((module) => (
          <li className="list-group-item">
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
              {module.lessons?.map((lesson) => (
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
