import React from "react";
import ModuleList from "../Modules/List";
import Status from "./status";
import "./index.css";

function Home() {
  return (
    <div className="home-container d-flex">
      <div className="module-list-container">
        <ModuleList />
      </div>
      <div className="status-container">
        <Status />
      </div>
    </div>
  );
}

export default Home;
