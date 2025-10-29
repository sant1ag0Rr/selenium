import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from './routes/adminRoute.js'
import vendorRoute from './routes/venderRoute.js'
import { cloudinaryConfig } from "./utils/cloudinaryConfig.js";

const App = express();

// CORS
const allowedOrigins = ['http://localhost:5173'];
App.use(
  cors({
    origin: allowedOrigins,
    methods:['GET', 'PUT', 'POST' ,'PATCH','DELETE'],
    credentials: true,
  })
);

// Básicos
App.use(express.json());
App.use(cookieParser());

// Cloudinary solo en rutas admin/vendor
App.use('/api/admin/*', cloudinaryConfig);
App.use('/api/vendor/*', cloudinaryConfig);

// Rutas
App.use("/api/user", userRoute);
App.use("/api/auth", authRoute);
App.use("/api/admin", adminRoute);
App.use("/api/vendor", vendorRoute);

// Manejo de errores
App.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    succes: false,
    message,
    statusCode,
  });
});

export default App;
