# 📝 Notes App

A simple and powerful Notes Application built with **ReactJS**, **NestJS**, **PostgreSQL**, and **MongoDB**. Easily create, manage, and organize your notes across devices.

---

## 🚀 Features

- Create, read, update, and delete notes
- Organize notes with tags or categories
- Responsive UI with ReactJS
- RESTful API powered by NestJS
- PostgreSQL for relational data
- MongoDB for flexible document storage (e.g., tags, logs, or metadata)
- Seamless development setup for quick start

---

## 🧰 Tech Stack

| Frontend | Backend | Database        |
|----------|---------|-----------------|
| ReactJS  | NestJS  | PostgreSQL, MongoDB |

---

## 📦 Installation & Running Locally

Follow the steps below to set up the project on your local machine:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/notes-app.git
cd notes-app
```

```bash
cd ./api
npm install
npm run start
```

```bash
cd ./client
npm install
npm start
```

### 2. Create .env file

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=notes_db

MONGODB_URI=mongodb://localhost:27017/notes_metadata
