# Todo Backend API

A robust, TypeScript-based backend API for a Todo List application built with Express.js, Prisma, and MySQL.

## Features

- **Full CRUD Operations** for tasks (Create, Read, Update, Delete)
- **Task Completion Toggle** with dedicated endpoint
- **Task Statistics** (total, completed, pending counts)
- **Filtered Task Views** (completed, pending)
- **Input Validation** using Zod schemas
- **Error Handling** with production/development modes
- **TypeScript** throughout for type safety
- **MySQL Database** with Prisma ORM
- **RESTful API** design

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: Prisma
- **Validation**: Zod
- **CORS**: Enabled for frontend integration

## Prerequisites

- Node.js (v16 or higher)
- MySQL database
- npm or yarn package manager

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd todo-backend
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/todo_db"

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Open Prisma Studio
npm run db:studio
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3001`

## API Endpoints

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get all tasks |
| `GET` | `/api/tasks/stats` | Get task statistics |
| `GET` | `/api/tasks/completed` | Get completed tasks |
| `GET` | `/api/tasks/pending` | Get pending tasks |
| `POST` | `/api/tasks` | Create new task |
| `PUT` | `/api/tasks/:id` | Update task |
| `DELETE` | `/api/tasks/:id` | Delete task |
| `PATCH` | `/api/tasks/:id/toggle` | Toggle task completion |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Server health status |

## Request/Response Examples

### Create Task

**Request:**
```bash
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "color": "blue"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clx123abc",
    "title": "Complete project documentation",
    "color": "blue",
    "completed": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "Task created successfully",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Get Task Statistics

**Request:**
```bash
GET /api/tasks/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 10,
    "completed": 6,
    "pending": 4
  },
  "message": "Task statistics retrieved successfully",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Task Colors

Available colors for tasks:
- `red`, `blue`, `green`, `yellow`
- `purple`, `orange`, `pink`, `gray`

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
```

## Project Structure

```
src/
├── constants/           # Application constants
├── lib/                # Database and utility libraries
├── middleware/         # Express middleware
├── routes/             # API route handlers
├── services/           # Business logic layer
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── index.ts            # Main server file
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Validation

All requests are validated using Zod schemas:
- Title: Required, max 255 characters
- Color: Must be one of predefined colors
- Task ID: Must be valid UUID format

## CORS Configuration

CORS is enabled for frontend integration. Update `CORS_ORIGIN` in `.env` for your frontend URL.

## Database Schema

```sql
CREATE TABLE tasks (
  id VARCHAR(191) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  color VARCHAR(50) NOT NULL DEFAULT 'blue',
  completed BOOLEAN NOT NULL DEFAULT false,
  createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updatedAt DATETIME(3) NOT NULL
);
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please open an issue in the repository.