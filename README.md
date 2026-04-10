# TaskFlow — MERN Stack Task Manager

A full-stack Task Manager built with **MongoDB + Express + React (Vite) + Node.js**.

---

## Project Structure

```
taskmanager/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   └── taskController.js      # CRUD logic with asyncHandler
│   ├── middleware/
│   │   └── errorMiddleware.js     # 404 + global error handler
│   ├── models/
│   │   └── taskModel.js           # Mongoose schema + validation
│   ├── routes/
│   │   └── taskRoutes.js          # Express router
│   ├── .env.example
│   ├── package.json
│   └── server.js                  # Entry point
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── taskApi.js         # Axios instance + API methods
    │   ├── components/
    │   │   ├── AddTaskForm.jsx
    │   │   ├── ErrorBanner.jsx
    │   │   ├── FilterBar.jsx
    │   │   ├── Header.jsx
    │   │   ├── TaskCard.jsx
    │   │   └── TaskList.jsx
    │   ├── hooks/
    │   │   └── useTasks.js        # All state + API logic
    │   ├── pages/
    │   │   └── TaskPage.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env.example
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

---

## Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier is fine) or local MongoDB

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/taskmanager
PORT=5000
NODE_ENV=development
```

```bash
npm run dev   # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev   # starts on http://localhost:5173
```

---

## API Reference

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| GET | `/api/tasks` | — | Get all tasks |
| POST | `/api/tasks` | `{ "title": "string" }` | Create a task |
| PATCH | `/api/tasks/:id` | `{ "completed": bool, "title": "string" }` | Toggle/update task |
| DELETE | `/api/tasks/:id` | — | Delete a task |

### Example Responses

**GET /api/tasks**
```json
{
  "success": true,
  "count": 2,
  "data": [
    { "_id": "...", "title": "Buy groceries", "completed": false, "createdAt": "..." }
  ]
}
```

**Error Response**
```json
{ "success": false, "message": "Title must be at least 3 characters long" }
```

---

## Deployment

### Backend → Render.com

1. Push code to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add Environment Variables:
   ```
   MONGODB_URI = <your Atlas URI>
   PORT        = 10000
   NODE_ENV    = production
   CLIENT_ORIGIN = https://your-app.vercel.app
   ```

### Frontend → Vercel

1. Import your repo on [vercel.com](https://vercel.com)
2. Settings:
   - **Framework:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Add Environment Variable:
   ```
   VITE_API_URL = https://your-backend.onrender.com/api
   ```

---

## Features

- ✅ Create tasks with validation (min 3 chars)
- ✅ Mark tasks as complete / incomplete
- ✅ Edit task titles inline
- ✅ Delete tasks
- ✅ Filter by All / Pending / Completed
- ✅ Progress bar showing completion %
- ✅ Optimistic UI updates
- ✅ Loading skeletons + error states
- ✅ Toast notifications (react-hot-toast)
- ✅ Fully responsive dark UI

---

## Assumptions & Trade-offs

- **No authentication** — single-user app as per assignment scope
- **Client-side filtering** — all tasks fetched once, filtered in the `useTasks` hook (appropriate for this scale)
- **Optimistic updates** — UI updates instantly on toggle/delete, reverts if server fails
- **In-memory fallback** — MongoDB used as specified; no file-based fallback needed
- **No pagination** — kept simple per the 1-2 hour scope guideline
