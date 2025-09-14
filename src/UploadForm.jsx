import React, { useState } from "react";

export default function UploadForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return setStatus("❌ Please select a file first.");
    if (!confirmed) return setStatus("❌ You must confirm before uploading.");

    try {
      // Step 1: Ask backend for presigned URL
      const res = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          filename: file.name,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to get upload URL");

      // Step 2: Upload file directly to R2
      const uploadRes = await fetch(data.url, {
        method: "PUT",
        body: file,
      });

      if (!uploadRes.ok) throw new Error("Upload failed");

      setStatus(`✅ File uploaded successfully as ${data.key}`);
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    }
  };

  return (
    <div className="upload-container">
      <form onSubmit={handleUpload} className="upload-form">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label>
          File:
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          Confirm these are the files to upload
        </label>

        <button type="submit" disabled={!confirmed}>
          Confirm & Upload
        </button>
      </form>

      {status && <p className="status">{status}</p>}
    </div>
  );
}
