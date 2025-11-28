# 🚀 Task Manager App  
A full-stack Task Management system built using the MERN stack.

This project includes:
- Fully functional backend (Node.js + Express + MongoDB)
- Secure authentication with JWT & HTTP-Only Cookies
- Role-based access (Admin & User)
- Full CRUD features for Tasks
- React frontend with protected routes
- API documentation
- Deployment-ready structure

---

## 📁 Tech Stack

### **Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication (Access token via HTTP-Only cookie)  
- Bcrypt password hashing  
- CORS with credentials  
- Express Error Handling  
- MVC + Modular folder structure  

### **Frontend**
- React.js  
- Context API (Global Auth & Task State)  
- Axios with credentials enabled  
- Tailwind CSS v4  
- Protected Routes  
- Admin-only access UI  
- Responsive UI Components  

---

# 📦 Features

## ✅ **Authentication**
- Register user  
- Login user  
- Logout user  
- Secure password hashing (bcrypt)  
- JWT-based authentication via httpOnly cookies  
- Auto-fetch logged-in user  
- Middleware for verifying tokens  

## 🔐 **Role-Based Access**
- `user` → normal usage  
- `admin` → can create, assign, edit, delete tasks  

## 📝 **Task Management**
- Create Task (Admin)  
- Assign task to any user  
- Get all tasks (Admin)  
- Get my tasks (User)  
- Update task status  
- Delete task  

---

# 🔗 Environment Variables

## Backend `.env`
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
CORS_ORIGIN=http://localhost:5173
PORT=5000
```

## Frontend `.env`
```
VITE_API_URL="your_backend_api_url"
```

---

# 🧪 API Documentation

## Auth Routes
| Method | Endpoint | Body | Protected |
|--------|----------|--------|----------|
| POST | /api/v1/users/register | { username, email, password } | ❌ |
| POST | /api/v1/users/login | { email, password } | ❌ |
| POST | /api/v1/users/logout | — | ✅ |

---

## User Routes
| Method | Endpoint | Protected | Role |
|--------|----------|----------|------|
| GET | /api/v1/users/me | ✅ | user/admin |
| GET | /api/v1/users/all | ✅ | admin |

---

## Task Routes
| Method | Endpoint | Body | Role |
|--------|----------|--------|-------|
| POST | /api/v1/tasks | title, description, assignedTo | admin |
| GET | /api/v1/tasks/all | — | admin |
| GET | /api/v1/tasks/my | — | user |
| PATCH | /api/v1/tasks/:id | status, title | admin |
| DELETE | /api/v1/tasks/:id | — | admin |

---

# 🖥️ Frontend Features

### 🌟 Authentication UI
- Login  
- Register  
- Toast messages  
- Auto redirect  

### 🌟 Admin UI
- Create Task  
- Assign User  
- View all tasks  
- Edit/Delete tasks  

### 🌟 User UI
- View assigned tasks  
- Update task status  
- Simple dashboard  

---

# 🚀 Deployment

## Backend Deployment (Render)
1. Create a new Web Service  
2. Build Command: *(leave empty unless using TypeScript)*  
3. Publish directory: **none**  
4. Add environment variables  
5. Deploy  

## Frontend Deployment (Vercel)
1. `npm run build`  
2. Upload `/dist` folder  
3. Add env: `VITE_API_URL`  
4. Deploy  

---

# 📈 Scalability Notes

### ✔ Horizontal Scaling
- Stateless APIs  
- JWT eliminates shared session storage  
- Compatible with load balancers  

### ✔ Database Scaling
- MongoDB replica sets  
- Sharding support  

### ✔ Caching Layer (Optional)
- Redis caching for:
  - Repeated task queries  
  - User session verification  

### ✔ Security Best Practices
- BCrypt password hashing  
- HTTP-only cookies  
- CORS with credentials  
- Input validation  
- Add rate limiting for production  

---

# ✅ Conclusion
This Task Manager App is production-ready, secure, scalable, and suitable for real-world usage or assessments.  
