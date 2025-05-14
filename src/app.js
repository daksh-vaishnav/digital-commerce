import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const API_VERSION = '/api/v1';

app.use(cors());
app.use(express.json());
app.use(`${API_VERSION}/auth`, authRoutes);

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
