# EasyTaskManager

EasyTaskManager is a full-stack task management web application designed for simplicity and usability. It allows users to create, view, edit, complete, and delete tasks through a user-friendly interface. The backend is powered by Java and Spring Boot, while the frontend is built with React and Bootstrap, using Vite for fast development.

## ✨ Features

- 📝 Add new tasks with title and description
- ✅ Mark tasks as done or undone
- ✏️ Edit existing tasks
- 🗑️ Delete tasks
- 🌟 View the 5 latest tasks on the homepage
- 📜 Daily motivational quote fetched from an external API
- 🎨 Responsive, minimal UI with dark theme (Bootstrap)
- 🔗 Full REST API integration with JSON communication

## 🔧 Technologies Used

### Backend:
- Java 17
- Spring Boot (REST API)
- Spring Web
- Spring DevTools
- CORS configuration enabled

### Frontend:
- React (functional components + Hooks)
- Vite
- Bootstrap 5 (React-Bootstrap)
- React Router
- Fetch API for backend integration

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/EasyTaskManager.git
cd EasyTaskManager
```

### 2. Backend Setup (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

Runs backend at: `http://localhost:8080`

### 3. Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

Runs frontend at: `http://localhost:5173`

## 🌐 Deployment (optional)

You can bundle frontend into static assets and serve them with Spring Boot using:

```bash
cd frontend
npm run build
```

Then copy contents of `frontend/dist` into a `static` folder inside `backend/src/main/resources/`.

## 📁 Folder Structure

```
EasyTaskManager/
│
├── backend/              # Spring Boot project
│   └── src/
│       └── main/
│           └── java/...  # Java source code
│           └── resources/static/  # For frontend build output
│
├── frontend/             # React project (Vite + Bootstrap)
│   ├── src/
│   └── public/
│
└── README.md             # Project overview and instructions
```

## 🧑‍💻 Author

**Grzegorz Dzyg** – Computer Science student, WSB-NLU, 2025  
Built as part of academic portfolio & real-world experience.

## 📜 License

This project is licensed under the MIT License.
