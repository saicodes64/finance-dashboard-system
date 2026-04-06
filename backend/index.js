require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const AuthRouter = require('./routes/AuthRoute');
const DashboardRouter = require('./routes/DashboardRoute');
const UserRouter = require('./routes/UserRoute');
const RecordsRouter = require('./routes/RecordsRouter');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/auth', AuthRouter);
app.use('/api/dashboard', DashboardRouter);
app.use('/api/users', UserRouter);
app.use('/api', RecordsRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB Atlas', err);
  });