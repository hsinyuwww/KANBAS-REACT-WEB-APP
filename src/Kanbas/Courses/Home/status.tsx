import React from "react";
import { FaFileImport, FaBullhorn, FaBell, FaTimes } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { IoBarChartSharp } from "react-icons/io5";
import { PiNumberCircleFiveFill } from "react-icons/pi";
import "./status.css";

const Status = () => {
  return (
    <div className="status-sidebar">
      <div className="sidebar-options">
        <button className="sidebar-button">
          <FaFileImport /> Import Existing Content
        </button>
        <button className="sidebar-button">
          <IoLogOutOutline /> Import from Commons
        </button>
        <button className="sidebar-button">
          <FiTarget /> Choose Home Page
        </button>
        <button className="sidebar-button">
          <IoBarChartSharp /> View Course Stream
        </button>
        <button className="sidebar-button">
          <FaBullhorn /> New Announcement
        </button>
        <button className="sidebar-button">
          <IoBarChartSharp /> New Analytics
        </button>
        <button className="sidebar-button">
          <FaBell /> View Course Notifications
        </button>
      </div>

      <div className="to-do-list">
        <h5>To Do</h5>
        <hr className="section-divider" />
        <div className="to-do-list">
          <PiNumberCircleFiveFill className="todo-icon" />
          <a href="#" className="to-do-link">
            Grade A1 - ENV + HTML
          </a>
          <FaTimes className="todo-false-icon" />
          <ul>
            {" "}
            <li className="todo-due">100 points - Sep 18 at 11:59pm</li>
          </ul>
        </div>
        <div className="todo-item">
          <PiNumberCircleFiveFill className="todo-icon" />
          <a href="#" className="to-do-link">
            Grade A2 - CSS + BOOTSTRAP
          </a>
          <FaTimes className="todo-false-icon" />
          <ul>
            {" "}
            <li className="todo-due">100 points - Oct 2 at 11:59pm</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Status;
