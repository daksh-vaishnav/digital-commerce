import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import routes from './routes/index.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const API_VERSION = '/api/v1';

app.use(cors());
app.use(express.json());

// Mount API routes
app.use(API_VERSION, routes);


const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
