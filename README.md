# 📝 NotesDesk - Full Stack Notes Management Application

NotesDesk is a secure, responsive, and production-ready MERN stack application that allows users to seamlessly register, log in, and manage their personal daily notes.

## 🚀 Live Links
- **Frontend App:** [https://onrender.com](https://onrender.com)
- **Backend API Server:** [https://onrender.com](https://onrender.com)

## ✨ Key Features
- **User Authentication:** Secure signup and login powered by JSON Web Tokens (JWT) and bcrypt password hashing.
- **Full CRUD Operations:** Create, Read, Update, and Delete notes seamlessly.
- **Isolated User Data:** Every user can only view, modify, or delete their own notes.
- **CORS Protection:** Configured with secure Cross-Origin Resource Sharing (CORS) rules for production safety.
- **Modern UI:** Styled beautifully using Tailwind CSS and interactive Feather/Lucide icons (`react-icons`).

## 🛠️ Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS, Axios, React Router Dom
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Cloud)
- **Hosting Platforms:** Render (Frontend Static Site & Backend Web Service)

## 📁 Project Structure (Monorepo)
```text
notes_management_app/
├── backend/
│   ├── config/          # Database Connection
│   ├── controllers/     # Business Logic (User & Note handlers)
│   ├── models/          # Mongoose Schemas (User & Note models)
│   ├── routes/          # Express API Endpoints
│   ├── server.js        # Main Entry Point
│   └── .env             # Environment Configurations
└── frontend/
    ├── src/
    │   ├── components/  # Protected Routes Configuration
    │   ├── pages/       # Dashboard, Login, Register Pages
    │   └── main.jsx     # Frontend Initialization
    └── vite.config.js
```

## ⚙️ Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd note_app
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   # Create a .env file and add:
   # PORT=5000
   # MONGODB_URL=your_mongodb_atlas_connection_string
   # JWT_SECRET=your_jwt_secret_key
   # FRONTEND_URL=http://localhost:5173
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## 🔒 Security Practices Implemented
- Local Environment variables are safely kept hidden via `.gitignore`.
- Production CORS origin restricted exclusively to the live frontend domain.
- Client requests are dynamically rewritten on the server to prevent standard SPA `404 Not Found` refresh bugs.
