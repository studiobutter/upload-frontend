import React from "react";
import UploadForm from "./UploadForm";
import "./upload.css";

function App() {
  return (
    <div className="App">
      <header className="topbar">
        <a href="https://studiobutter.io.vn" className="logo">
          Studio Butter
        </a>
        <span className="separator">|</span>
        <h1 className="page-title">Upload Files</h1>
      </header>
      <UploadForm />
    </div>
  );
}

export default App;
