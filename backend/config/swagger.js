const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Backend API",
      version: "1.0.0",
      description: "API documentation for Finance Dashboard Backend"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./routes/*.js"] // where your API docs will be written
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;