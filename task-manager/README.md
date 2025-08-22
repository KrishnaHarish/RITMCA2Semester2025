# Personal Task Manager

A full-stack web application for managing personal tasks with user authentication. Built with React, Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Secure registration and login system
- **Personal Tasks**: Create, read, update, and delete tasks
- **Task Properties**: Title, description, priority (low/medium/high), due date
- **Task Status**: Mark tasks as completed or pending
- **Task Filtering**: View all tasks, pending tasks, or completed tasks
- **User Isolation**: Each user can only see and manage their own tasks
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens) for authentication
- bcryptjs for password hashing
- CORS for cross-origin resource sharing

### Frontend
- React with TypeScript
- Axios for API calls
- React Context for state management
- CSS for styling

## Project Structure

```
task-manager/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.tsx
    │   │   ├── Register.tsx
    │   │   ├── TaskList.tsx
    │   │   ├── TaskForm.tsx
    │   │   └── TaskItem.tsx
    │   ├── contexts/
    │   │   └── AuthContext.tsx
    │   ├── services/
    │   │   ├── api.ts
    │   │   ├── auth.ts
    │   │   └── task.ts
    │   ├── types/
    │   │   └── index.ts
    │   ├── App.tsx
    │   ├── App.css
    │   └── index.tsx
    └── package.json
```

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd task-manager/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the backend directory with:
   ```
   MONGODB_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your-secret-key-here
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd task-manager/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Tasks
- `GET /api/tasks` - Get all tasks for authenticated user
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Usage

1. **Register**: Create a new account with username, email, and password
2. **Login**: Sign in with your username/email and password
3. **Create Tasks**: Click "Add New Task" to create a new task
4. **Manage Tasks**: 
   - Check/uncheck tasks to mark as completed
   - Edit tasks inline by clicking the "Edit" button
   - Delete tasks by clicking the "Delete" button
5. **Filter Tasks**: Use the filter buttons to view all, pending, or completed tasks
6. **Logout**: Click the logout button to end your session

## Security Features

- Password hashing using bcryptjs
- JWT tokens for secure authentication
- Protected routes requiring authentication
- User-specific data isolation
- Input validation and sanitization

## Future Enhancements

- Task categories and labels
- Task sharing and collaboration
- File attachments
- Task reminders and notifications
- Search and advanced filtering
- Mobile app version
- Dark mode theme

## Contributing

This is a learning project for MCA students. Feel free to fork and modify for educational purposes.

## License

This project is for educational purposes only.