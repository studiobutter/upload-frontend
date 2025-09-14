# Upload Frontend (React + Cloudflare Pages)

## 📌 Overview

This is the **frontend React app** for the file upload system.
It provides a simple upload page where users can:

* Enter a **username**
* Enter a **password** (checked by the Worker)
* Select a **file**
* Confirm upload via a checkbox
* Submit to upload directly into **Cloudflare R2** through a presigned URL

The backend Worker API is hosted separately. Check [upload_api](https://github.com/studiobutter/upload-api) for more details.

---

## ✅ Features

* Clean **React UI** built with Vite
* Top bar with **Studio Butter branding** (Marcellus + DM Serif Text)
* Inputs styled with **Roboto**
* Bold action button with **Montserrat**
* Direct R2 upload via presigned URL (no files pass through the Worker)
* CORS configured in R2 for secure browser uploads

---

## 🗂️ Project Structure

```bash
upload-frontend/
  index.html        ← entry HTML (imports fonts)
  src/
    App.jsx         ← root component
    UploadForm.jsx  ← upload form logic
    upload.css      ← styling
    main.jsx        ← Vite bootstrap
```

---

## ⚙️ Setup

### 1. Install dependencies

```bash
cd upload-frontend
npm install
```

### 2. Run locally

```bash
npm run dev
```

The app runs at [http://localhost:5173](http://localhost:5173).

Make sure your backend Worker is also running (e.g. `http://localhost:8787/get-upload-url`) or deployed to `https://api.example.com`.

---

## 🔗 Configuration

In `UploadForm.jsx`, update the API URL:

```js
const res = await fetch("https://api.example.com/get-upload-url", { ... });
```

For local testing, use:

```js
"http://localhost:8787/get-upload-url"
```

You can also create a `.env` file for switching between dev/prod automatically:

```env
VITE_API_URL=http://localhost:8787/get-upload-url
```

Then in code:

```js
const res = await fetch(import.meta.env.VITE_API_URL, { ... });
```

---

## 🚀 Deployment

1. Build the site:

   ```bash
   npm run build
   ```

1. Deploy to Cloudflare Pages:

   ```bash
   npx wrangler pages publish dist
   ```

1. Configure custom domain:

   * `upload.example.com` → Cloudflare Pages project

---

## 🧪 Testing

1. Open [http://localhost:5173](http://localhost:5173).
2. Fill in username, password, select a file, check the box, and click **Confirm & Upload**.
3. File should upload into R2 under `username/filename`.
4. Status message will confirm success or error.

---

## 🔒 Notes

* Keep frontend API URL restricted to your own domain.
* Ensure R2 **CORS policy** includes your frontend origin (dev + prod).
* Password is only a simple gate; for production, consider stronger auth.
