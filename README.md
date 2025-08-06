
💼 ResumeOptimax

An AI-powered resume enhancement platform that helps job seekers tailor their resumes to specific job descriptions using modern AI and web technologies.

🔍 Overview

ResumeOptimax allows users to:
- Upload resumes in .PDF, .DOCX, .DOC, or .TXT format
- Upload or paste a job description
- Instantly enhance the resume using Google Gemini AI
- View, copy, and download the optimized resume in multiple formats

Designed to maximize ATS (Applicant Tracking System) compatibility, highlight relevant skills, and increase interview conversion rates.

🚀 Tech Stack

Frontend: React 18, TypeScript, Tailwind CSS, ShadCN UI, Vite
Backend: Node.js + Express.js, REST API, dotenv, CORS, Body-Parser
AI: Google Gemini API

📸 Screenshots

(Place images like ./screenshots/upload.png, ./screenshots/enhanced.png here)

🛠 Features

- Resume + Job Description parsing
- AI-powered content rewriting
- PDF, DOCX, and TXT export options
- Live preview editor
- Environment variables for API key security

📂 Project Structure

resume-optimax-ai/
├── backend/
│   ├── routes/
│   ├── services/
│   ├── .env
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── pages/
│   └── vite.config.ts
└── README.md

🔧 Setup Instructions

1. Prerequisites

- Node.js (v18+ recommended)
- NPM
- A valid Google Generative AI (Gemini) API Key

2. Clone the Repo

git clone https://github.com/YOUR_USERNAME/resume-optimax-ai.git
cd resume-optimax-ai

3. Set Up Backend

cd backend
npm install

Create a .env file in /backend:

GEMINI_API_KEY=your_google_gemini_api_key

Then start the backend server:

npm start  # Running at http://localhost:5000

4. Set Up Frontend

cd frontend
npm install
npm run dev  # Running at http://localhost:8080

🛡️ Environment Variables

To keep your secrets secure, create a .env file (excluded from Git) containing:

GEMINI_API_KEY=your_key_here

Also provide a safe .env.example with:

GEMINI_API_KEY=

📄 License

This project is licensed under the MIT License.

✨ Author

Made with 💻 by Yash Bobde
GitHub: https://github.com/Yash-Bobde
Portfolio: https://yash-bobde.vercel.app/
LinkedIn: https://www.linkedin.com/in/yash-bobde/
