import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import UsersController from "./users/users-controller.js";



const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/user');
UsersController(app)

app.listen(5000);