import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectMongo } from "./src/config/dbConfig.js";
import {
  deleteManyTask,
  deleteTask,
  getAllTask,
  insertTask,
  updateTaskById,
} from "./src/model/TaskModel.js";
import cors from "cors";

import path from "path";
const __dirname = path.resolve();

const app = express();
const PORT = 8000;

app.use(express.static(__dirname + "/build"));
// to parse the data that we receive from post method in the json format
app.use(express.json());
app.use(cors());

// supposing this is db in future
// let fakeDB = [];

// connect mongo
connectMongo();

app.get("/api/v1/task", async (req, res) => {
  const taskList = await getAllTask();

  res.json({
    status: "success",
    message: "Here are the task lists",
    taskList,
  });
});

app.post("/api/v1/task", async (req, res) => {
  // fakeDB.push(req.body);
  const result = await insertTask(req.body);

  result?._id
    ? res.json({
        status: "success",
        message: "New task has been added",
      })
    : res.json({
        status: "error",
        message: "Error, unable to add the task. Please try again later",
      });
});

app.patch("/api/v1/task", async (req, res) => {
  const { _id, type } = req.body;
  const result = await updateTaskById(_id, { type });

  result?._id
    ? res.json({
        status: "success",
        message: "The task has been updated",
      })
    : res.json({
        status: "error",
        message: "Error, unable to update the task. Please try again later",
      });
});

app.delete("/api/v1/task/", async (req, res) => {
  // const { _id } = req.params;
  const { ids } = req.body;

  // const result = await deleteTask(_id);
  const result = await deleteManyTask(ids);

  // result?._id
  result?.deletedCount
    ? res.json({
        status: "success",
        // message: "The task has been deleted",
        message: "All The task has been deleted",
      })
    : res.json({
        status: "error",
        message: "Error, unable to delete the task. Please try again later",
      });
});

app.get("/", (req, res) => {
  res.json({
    message: "server is running normal",
  });

  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log("Your server is running at http://localhost:" + PORT);
});
