# Smart Leads Dashboard

A full-stack Lead Management Dashboard built with the MERN stack and TypeScript.

## Live Demo
- Frontend: https://smart-leads-frontend-nine.vercel.app
- Backend: https://smart-leads-dashboard-hbnu.onrender.com

## Tech Stack

**Frontend:** React.js, TypeScript, TailwindCSS  
**Backend:** Node.js, Express.js, TypeScript, MongoDB, Mongoose  
**Auth:** JWT + bcrypt  
**DevOps:** Docker, Docker Compose  

## Features

- JWT Authentication (Register/Login)
- Leads CRUD (Create, Read, Update, Delete)
- Advanced Filtering by Status, Source
- Debounced Search by Name or Email
- Sort by Latest/Oldest
- Backend Pagination (10 per page)
- CSV Export
- Role-Based Access Control (Admin/Sales)
- Docker Setup
- Dark Mode (Bonus)

## Project Structure

```
smart-leads-dashboard/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── types/
│   │   └── index.ts
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── types/
│   ├── Dockerfile
│   └── .env.example
└── docker-compose.yml
```

## Getting Started

### Prerequisites
- Node.js v20+
- MongoDB
- Docker (optional)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in your .env values
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Fill in your .env values
npm start
```

### Docker Setup

```bash
docker-compose up --build
```

## Environment Variables

### Backend
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Frontend
```env
REACT_APP_API_URL=your_backend_url
```

## API Documentation

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |

### Leads
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/leads | Get all leads |
| GET | /api/leads/:id | Get single lead |
| POST | /api/leads | Create lead |
| PUT | /api/leads/:id | Update lead |
| DELETE | /api/leads/:id | Delete lead (Admin only) |
| GET | /api/leads/export | Export CSV |

### Query Parameters for GET /api/leads
| Parameter | Description |
|-----------|-------------|
| page | Page number (default: 1) |
| status | Filter by status |
| source | Filter by source |
| search | Search by name or email |
| sort | latest or oldest |

## Role-Based Access
| Feature | Admin | Sales |
|---------|-------|-------|
| View Leads | ✅ | ✅ |
| Create Lead | ✅ | ✅ |
| Update Lead | ✅ | ✅ |
| Delete Lead | ✅ | ❌ |
| Export CSV | ✅ | ✅ |