require('dotenv').config();
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zorvyn Finance API",
      version: "1.0.0",
      description:
        "API documentation for the Zorvyn Finance Dashboard backend. " +
        "Most endpoints require a valid JWT access token sent via the `accessToken` cookie or Bearer header.",
    },
    servers: [
      { 
        url: process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 3000}`, 
        description: "API Server" 
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "accessToken",
        },
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        // ── Auth ──────────────────────────────────────────────────────────
        SignupRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", example: "user@zorvyn.com" },
            password: { type: "string", minLength: 8, maxLength: 20, example: "secret123" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", example: "user@zorvyn.com" },
            password: { type: "string", example: "secret123" },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Login successful" },
            success: { type: "boolean", example: true },
            token: { type: "string", example: "eyJhbGciOiJIUzI1NiJ9..." },
            role: { type: "string", example: "ADMIN" },
          },
        },
        // ── User ──────────────────────────────────────────────────────────
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "661a2b3c4d5e6f7a8b9c0d1e" },
            email: { type: "string", format: "email", example: "admin@zorvyn.com" },
            role: { type: "string", enum: ["ADMIN", "ANALYST", "VIEWER"], example: "ANALYST" },
            isActive: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        CreateUserRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email", example: "newuser@zorvyn.com" },
            password: { type: "string", minLength: 8, maxLength: 20, example: "secret123" },
            role: { type: "string", enum: ["ADMIN", "ANALYST", "VIEWER"], example: "ANALYST" },
            isActive: { type: "boolean", example: true },
          },
        },
        UpdateUserRequest: {
          type: "object",
          properties: {
            email: { type: "string", format: "email", example: "updated@zorvyn.com" },
            password: { type: "string", minLength: 8, maxLength: 20, example: "newpassword" },
            role: { type: "string", enum: ["ADMIN", "ANALYST", "VIEWER"], example: "ADMIN" },
            isActive: { type: "boolean", example: false },
          },
        },
        // ── Records ───────────────────────────────────────────────────────
        Record: {
          type: "object",
          properties: {
            _id: { type: "string", example: "661a2b3c4d5e6f7a8b9c0d2f" },
            userId: { type: "string", example: "661a2b3c4d5e6f7a8b9c0d1e" },
            amount: { type: "number", example: 5000 },
            type: { type: "string", enum: ["INCOME", "EXPENSE"], example: "INCOME" },
            category: { type: "string", example: "Salary" },
            date: { type: "string", format: "date-time", example: "2024-04-01T00:00:00.000Z" },
            notes: { type: "string", example: "Monthly salary" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        CreateRecordRequest: {
          type: "object",
          required: ["amount", "type", "category", "date"],
          properties: {
            amount: { type: "number", example: 2500 },
            type: { type: "string", enum: ["INCOME", "EXPENSE"], example: "EXPENSE" },
            category: { type: "string", example: "Utilities" },
            date: { type: "string", format: "date", example: "2024-04-05" },
            notes: { type: "string", example: "Electricity bill" },
          },
        },
        // ── Common ────────────────────────────────────────────────────────
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Internal Server Error" },
          },
        },
        SuccessMessage: {
          type: "object",
          properties: {
            message: { type: "string" },
            success: { type: "boolean", example: true },
          },
        },
      },
    },
    security: [{ cookieAuth: [] }, { bearerAuth: [] }],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;