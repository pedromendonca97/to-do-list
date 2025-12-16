import express from "express"
import {
  createTaskController,
  getAllTasksController,
  updateTaskController,
  deleteTaskController,
  setTaskStatusController
} from "../controllers/controller.js"

const router = express.Router()

router.post("/tasks", createTaskController) // Rota de criação de tarefas

router.get("/tasks", getAllTasksController)// Rota de listagem de tarefas

router.put("/tasks/:id", updateTaskController)// Rota de update de tarefa

router.delete("/tasks/:id", deleteTaskController)// Rota de delete da tarefa

router.patch("/tasks/:id/complete", setTaskStatusController)// Rota de alteração de status da tarefa

export { router }
