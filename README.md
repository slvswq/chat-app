# Chat App — Full-Stack Web Messenger

A full-stack real-time messaging application built with the **MERN Stack** (MongoDB, Express, React, Node.js).

This app supports **real-time messaging**, channel management, user search, and provides a responsive and user-friendly interface.

---

## Features

- **JWT-based authentication** for secure login.
- **Real-time messaging** between users using Socket.io.
- Users can **create new channels** or **join existing ones**.
- Each channel displays a **list of participants**.
- Built-in **user search** to quickly find people.
- Channel creators can **remove users** from their channels.
- Responsive and intuitive **frontend UI**.

---

## Tech Stack

- **Frontend:** React, TailwindCSS, Vite, React Router, React Hook Form, Zustand
- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.io
- **Authentication:** JWT (JSON Web Tokens)
- **Testing:** Vitest, Supertest, mongodb-memory-server
- **Build tools:** Rollup (backend), Vite (frontend), TypeScript

---

## Getting Started

### Prerequisites

- Node.js v20+
- pnpm v10+
- MongoDB Atlas account (or local MongoDB instance)

### Installation

Clone the repository:

```bash
git clone git@github.com:slvswq/chat-app.git
cd chat-app
```

Install dependencies for both backend and frontend:

```bash
pnpm bootstrap
```

### Evironment variables

Create `.env` files in both `backend` and `frontend` folders.

**Backend `.env`:**

```ini
PORT=5001
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

**Frontend `.env` (only for development):**

```ini
VITE_BACKEND_URL=http://localhost:5001
```

### Running the project

#### Start in production mode:

```bash
pnpm build
pnpm start
```

#### Start in development mode:

**Backend**

```bash
cd backend
pnpm dev
```

**Frontend**

```bash
cd frontend
pnpm dev
```

### Scripts

**Root `package.json`**

```bash
pnpm bootstrap  # Install backend & frontend dependencies
pnpm build      # Build backend & frontend
pnpm start      # Start backend server that serves all frontend files
```

**Backend `package.json`**

```bash
pnpm dev          # Start backend in development
pnpm build        # Build backend using Rollup
pnpm start        # Start backend in production
pnpm test         # Run backend tests
pnpm test:watch   # Run backend tests in watch mode
```

**Frontend `package.json`**

```bash
pnpm dev       # Start frontend dev server
pnpm build     # Build frontend
pnpm preview   # Preview production build
pnpm lint      # Run ESLint
```
