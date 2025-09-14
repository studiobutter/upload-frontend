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

      <footer className="footer">
        <a href="https://github.com/studiobutter/upload-api" target="_blank" rel="noopener noreferrer">
          GitHub Source Code (Backend)
        </a>
        <a href="https://github.com/studiobutter/upload-frontend" target="_blank" rel="noopener noreferrer">
          GitHub Source Code (Frontend)
        </a>
        <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer">
          Powered by Cloudflare
        </a>
      </footer>
    </div>
  );
}

export default App;
