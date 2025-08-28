# Todo Backend API

A robust, TypeScript-based backend API for a Todo List application built with Express.js, Prisma, and MySQL. This project demonstrates modern backend development practices with a focus on type safety, data validation, and clean architecture.

## Features

- **Full CRUD Operations** for tasks (Create, Read, Update, Delete)
- **Task Completion Toggle** with dedicated endpoint
- **Task Statistics** (total, completed, pending counts)
- **Filtered Task Views** (completed, pending)
- **Due Date Management** - set and edit task deadlines
- **Priority Levels** - low, medium, high
- **Task Descriptions** - optional detailed notes
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
| `GET` | `/api/tasks/:id` | Get single task by ID |
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
  "description": "Write comprehensive API docs for the todo backend",
  "dueDate": "2024-01-20T23:59:59.000Z",
  "priority": "high"
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
    "description": "Write comprehensive API docs for the todo backend",
    "dueDate": "2024-01-20T23:59:59.000Z",
    "priority": "high",
    "completed": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "Task created successfully",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Update Task

**Request:**
```bash
PUT /api/tasks/clx123abc
Content-Type: application/json

{
  "dueDate": "2024-01-25T23:59:59.000Z",
  "priority": "high"
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

## Task Properties

### Colors
Color is automatically assigned (default: blue). The backend supports multiple colors but users don't need to select them.

### Priorities
Priority levels: `low`, `medium`, `high`

### Due Dates
Due dates accept ISO 8601 datetime strings (e.g., "2024-01-20T23:59:59.000Z")

### Descriptions
Optional text field for additional task details (max 1000 characters)

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
npm run test:api     # Test API endpoints
```

## Project Structure

```
src/
├── constants/           # Application constants and enums
├── lib/                # Database and utility libraries
├── middleware/         # Express middleware (validation, logging, security)
├── routes/             # API route handlers
├── services/           # Business logic layer
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and helpers
└── index.ts            # Main server file
```

## Error Handling

The API returns consistent error responses with appropriate HTTP status codes:

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
- Color: Automatically assigned (default: blue)
- Description: Optional, max 1000 characters
- Due Date: Optional, must be valid ISO datetime string
- Priority: Optional, must be one of predefined levels
- Task ID: Must be valid CUID format

## CORS Configuration

CORS is enabled for frontend integration. Update `CORS_ORIGIN` in `.env` for your frontend URL.

## Database Schema

The current schema includes:

```sql
CREATE TABLE tasks (
  id VARCHAR(191) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  color VARCHAR(50) NOT NULL DEFAULT 'blue',
  description TEXT,
  dueDate DATETIME(3),
  priority VARCHAR(20) NOT NULL DEFAULT 'medium',
  completed BOOLEAN NOT NULL DEFAULT false,
  createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updatedAt DATETIME(3) NOT NULL
);
```

## Development Notes

I built this backend to handle the core functionality needed for a todo application while maintaining clean code practices. The service layer separates business logic from route handlers, and the middleware stack handles common concerns like validation, logging, and security headers.

The Prisma schema was designed to be flexible - tasks can have optional descriptions and due dates, and the priority system helps with task organization. I chose CUID for IDs since they're more URL-friendly than UUIDs and still provide good uniqueness guarantees.

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