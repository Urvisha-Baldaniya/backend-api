const express = require("express");
const cors = require("cors");

const app = express();
const connection = require("./connection/db");
const taskRoute = require("./controller/routes.task");

app.use(cors());
app.use(cors({origin:"http://localhost:3000"}))
app.use(express.json());
app.use("/tasks", taskRoute);

const port = 9000;

app.listen(port, async (err)=>{
    await connection;
    err? console.log("Something went wrong",err) : console.log("Server in running at port",port);
});