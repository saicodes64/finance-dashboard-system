# Finance Data Processing & Access Control Backend

## 🔗 Live API Documentation
Access the deployed Swagger UI here:  
https://zorvyn-5ovo.onrender.com/api-docs/

---

## Overview

This project is a backend system for managing financial records with **role-based access control (RBAC)**. It provides APIs for user management, financial record operations, and dashboard-level insights.

The system is designed with a focus on **clean architecture, security, and maintainability**.

---

## Tech Stack

- Node.js + Express  
- MongoDB Atlas (Cloud Database)  
- JWT Authentication  
- bcrypt (password hashing)  
- Swagger UI (API documentation)  

---

## Features Implemented

- User and Role Management  
- Financial Records CRUD  
- Record Filtering (type, category, date range)  
- Dashboard Summary APIs  
- Role-Based Access Control (RBAC)  
- Input Validation and Error Handling  
- Data Persistence using MongoDB Atlas  

---

## Role-Based Access Control

| Role     | Permissions |
|----------|------------|
| Admin    | Full access (users + records CRUD) |
| Analyst  | View all records + dashboard |
| Viewer   | Dashboard access only |

---

## API Endpoints

### Auth
- POST `/api/auth/signup`
- POST `/api/auth/login`

---

### Users (Admin only)
- GET `/api/users`
- POST `/api/users`
- PUT `/api/users/:id`
- DELETE `/api/users/:id`

---

### Records
- GET `/api/records` → Admin, Analyst  
- POST `/api/records` → Admin  
- PUT `/api/records/:id` → Admin  
- DELETE `/api/records/:id` → Admin  

---

### Dashboard
- GET `/api/dashboard/summary` → All roles  

---

## Filtering (Records)

Supports query-based filtering:

```
GET /api/records?type=EXPENSE&category=Food&startDate=2026-04-01&endDate=2026-04-06
```

---

## Authentication

- Uses JWT (Bearer Token)
- Include token in header:

---

## Swagger API Documentation

The API is documented and testable via Swagger UI.

- Open the provided link  
- Click **Authorize**  
- Enter: `Bearer <token>`  

---

## Test Credentials

| Role    | Email | Password |
|---------|------|----------|
| Admin   | admin@test.com | Admin@123 |
| Analyst | analyst@test.com | Analyst@123 |
| Viewer  | viewer@test.com | Viewer@123 |

---

## Project Structure
```
src/
controllers/
models/
routes/
middleware/
config/
```

---

## Key Design Decisions

- Single User model with role field (no multiple schemas)  
- RBAC implemented via middleware (`isLoggedIn`, `authorizeRole`)  
- Resource-based routing (not role-based routes)  
- userId derived from JWT (not request body)  

---

## Trade-offs

- Refresh tokens not implemented (kept simple)  
- Advanced validation (Joi) partially implemented  
- Analysts can view all records (simplified for assignment)  

---

## Additional Notes

- Follows separation of concerns:
  - Routes → endpoints  
  - Middleware → authentication & RBAC  
  - Controllers → business logic  

- Dashboard returns user-specific summary by default  
- Filtering implemented for records API  
- System is easily extendable for:
  - pagination  
  - advanced validation  
  - fine-grained access control  

---

## How to Run Locally

```
npm install
nodemon index.js
cd backend && touch .env
```

---

## Deployment

- Backend deployed on Render  
- Database hosted on MongoDB Atlas  

---

## Submission Note

This implementation focuses on building a **clean and logically structured backend system** with correct RBAC and data handling rather than unnecessary complexity.