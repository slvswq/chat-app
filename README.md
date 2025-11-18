# Chat App — Full-Stack Web Messenger
A full-stack real-time messaging application built with **MERN Stack**. 

The project includes real-time communication, channel management, user search, media uploads, and a pleasant, responsive UI.

## Functionality
- **JWT**-based authentication
-   **Real-time messaging** between users.
-   Users can **create new channels** or **join existing ones**.
-   Each channel displays a **list of participants**.
-   Built-in **user search** to quickly find people.
-   A **pleasant, user-friendly UI** for a smooth experience.
-   Channel creators have the ability to **remove users** from their channels.

## Features
- **Backend API** – Node.js + Express.js handles authentication and data management.
- **Cloudinary** – uploading images.
- **Database** – MongoDB for storing users and messages.
- **Integration Testing** – vitest, supertest, and mongodb-memory-server.

## Tech Stack
- Frontend: Vite + React.js.
- Backend: Node.js + Express.js.
-   Language: TypeScript.
- Database & Auth: MongoDB Atlas, mongoose, jsonwebtoken.

## Setup & Installation

### Prerequisites
-   Node.js >= 18
-   pnpm >= 8
- MongoDB Atlas project (for Authentication, Database, and Storage)
- Cloudinary project (for storing & uploading images)
> Note: This project is built using **pnpm**. Using npm or yarn may work, but pnpm is recommended to avoid dependency issues.

### 1. Clone the repository
```bash
git clone git@github.com:slvswq/chat-app.git
cd chat-app
```
### 2. Install dependencies
#### Backend:
```bash
cd backend
pnpm install
```
#### Frontend:
```bash
cd frontend
pnpm install
```
### 3. Environment Variables
Rename `.env.example` file in **/backend** to `.env`:
```ini
PORT=5001
MONGODB_URI=your_mongo_uri

JWT_SECRET=mysecretkey
NODE_ENV=development

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
### 4. Running the App (dev mode)
#### Backend:
```bash
cd backend
pnpm dev
```
#### Frontend:
```bash
cd frontend
pnpm dev
```
## Scripts

### Backend:
-   `pnpm dev` – run backend in development mode
-   `pnpm build` – build project
- `pnpm test` – run vitest
- `pnpm test:watch` - run vitest in watch mode

### Frontend:
-   `pnpm dev` – run frontend in development mode
-   `pnpm build` – build production React app
-   `pnpm lint` - run eslint.
-   `pnpm preview` - start web server that serves the built solution 

