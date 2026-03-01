# Tasknova
Tasknova is a full-stack task and project management web application that helps teams organize work, track progress, and generate productivity reports.

Build with React Frontend, Express/Node backend, MongoDB database and React Router.
## Demo Link

[Live Demo](https://tasknova-app.vercel.app)

##  Quick Start
```
git clone https://github.com/ankitsahucodes/tasknova-app.git
cd tasknova-app
npm install
npm run dev
```
## Environment Setup
Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```
#### Required Keys:<br>
PORT – Port on which the server runs<br>
MONGODB_URI – MongoDB connection string<br>
JWT_SECRET - Secret key<br>

## Frontend Environment Setup
Create a `.env` file in the root directory: 
```
VITE_API_BASE_URL=your_backend_url
```

## Technologies
- React JS
- React Router
- Chart.js
- Node.js
- Express
- MongoDB
- Axios
- JWT Authentication
- React Icons
- React Toastify

## Features
**Authentication (Login / Sign Up)**

- Secure JWT-based user authentication
- Form validation with error handling
- Toast notifications for success & failure

**Dashboard**
- Overview of projects and recent tasks
- Quick navigation through dynamic sidebar
- Personalized user experience
- Search Bar for projects
- Filter Tasks by Status

**Projects Page**
- List all Projects
- Add a New Project

**Projects Details**
- View project-wise task distribution
- Navigate to detailed Task view
- All tasks displayed for a selected project
- Add new tasks directly inside the project
- Filter tasks by Status

**Tasks Details**
- Task Details Page
- Update task Status

**Teams Page**
- Create a new team
- Team Details Page

**Team Details**
- Team details and Members
- Add a New Member

**Report**
- Total Task vs Completed Chart
- Task Status Distribution

**Settings**
- Delete a Project
- Delete a Task
- Deleta a Project

**Logout**
- Removes authentication token
- Ends user session securely
- Redirects to login screen

## API Reference

### **Register User**

#### POST /auth/signup
**Sample Response:**
```
{
  "name": "Abc,
  "email": "abc@email.com",
  "password": "123456"
}
```

### **Login User**

#### POST /auth/login
**Sample Response:**
```
{
  "email": "abc@email.com",
  "password": "123456"
}
```

### **Projects**
#### GET /projects

Get all projects

**Sample Response:**
```
[{ _id, name, description, createdBy, createdAt }]
```

#### POST /projects

Create a new project

**Sample Response:**
```
{ _id, name, description, createdBy }
```
#### GET /projects/:id

Get project by ID

**Sample Response:**
```
{ _id, name, description}
```

#### DELETE /projects/:id

Delete a project

**Sample Response:**
```
{ message }
```
### **Tasks**
#### GET /tasks

Get all tasks

**Sample Response:**
```
[{ _id, title, status, priority, deadline, project }]
```

#### POST /tasks

Create a new task

**Sample Response:**
```
{ _id, title, status, owner, team }
```

#### GET /tasks/:id

Get task by ID

**Sample Response:**
```
{ _id, title, description, status, tags[], dueDate }
```
#### PUT /tasks/:id

Update task

**Sample Response:**
```
{ message, task }
```

#### DELETE /tasks/:id

Delete task

**Sample Response:**
```
{ message }
```
### **Teams**
#### GET /teams

Get all teams

**Sample Response:**
```
[{ _id, name, members[] }]
```

#### POST /teams

Create a team

**Sample Response:**
```
{ _id, name, members[] }
```
#### GET /teams/:id

Get team by ID

**Sample Response:**
```
{ _id, name, members[]}
```
#### PUT /teams/:id

Update team

**Sample Response:**
```
{ message, team }
```

#### DELETE /teams/:id

Delete team

**Sample Response:**
```
{ message }
```

### **Reports**

#### GET /reports/completedTasks

Get total number of completed tasks

**Sample Response:**
```
{ "totalCompletedTasks": 24 }
```

#### GET /reports/allTasks

Get total number of tasks

**Sample Response:**
```
{ "totalTasks": 60 }
```

#### GET /reports/todoTasks

Get total number of To Do tasks

**Sample Response:**
```
{ "totalTodoTasks": 15 }
```

#### GET /reports/inProgressTasks

Get total number of In Progress tasks

**Sample Response:**
```
{ "totalInProgressTasks": 21 }
```
#### GET /reports/closedTasks/team

Get number of tasks closed by each team

**Sample Response:**

```
[
  { "name": "Frontend Team", "totalClosed": 12 },
  { "name": "Backend Team", "totalClosed": 8 }
]
```

## Contact

For bugs or feature requests, please reach out to ankitsahu2829@gmail.com