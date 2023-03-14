require("dotenv").config();

const express = require("express");
const app = express();
var cors = require('cors');
const publicPath = "frontend"
const path = require("path")


const connectDB = require("./config/db");
connectDB();
app.use(cors());

const usersRouter = require("./routes/users")
const blogsRouter = require("./routes/blogs")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/users", usersRouter);
app.use("/blogs", blogsRouter);

app.get('/', (_, res) => res.sendFile(path.join(__dirname, "..", publicPath,"/home.html")));
app.use(express.static(path.join(__dirname, "..", publicPath)))
module.exports = app