import session from "express-session";
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import AuthController from "./users/users-controller.js";


const app = express();
app.use(
    session({
        secret: "any string",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);

app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/user');
AuthController(app);
const port = process.env.PORT || 5000;
app.listen(5000);