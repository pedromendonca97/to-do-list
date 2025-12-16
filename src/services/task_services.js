// Regra de negócio
// Service valida dados crus.
// Model recebe dados já validados.

import { v4 as uuidv4 } from "uuid" // lib gerador de id
import { createTask } from "../models/task_models.js"
import {
  addTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  setTaskStatus
} from "../database/database.js"

function createTaskService(title) { // Usuário só vai inserir o título
  // Validação
  if (typeof title !== "string" || title.trim() === "") { // typeof verifica se title é uma string. trim() garante que a string não seja vazia.
    throw new Error("Título obrigatório!")
  }

  // Regras de negócio
  const id = uuidv4() // UUID gerado aqui
  const isCompleted = false

  // Model
  const task = createTask(id, title, isCompleted)

  // Armazenando no Database
  addTask(task)

  return task
}

function getAllTasksService() {
  const tasks = getAllTasks() // Chama a função de retornar os itens do array [taskData]
  return tasks // Retorna
}

function updateTaskService(id, title) {
  // Validando id
  if (!id) {
    return { error: "ID é obrigatório!" }
  }

  // Validando título
  if (typeof title !== "string" || title.trim() === "") {
    return { error: "Título inválido!" }
  }

  // Verificando se tarefa existe
  const existingTask = getTaskById(id)
  if (!existingTask) {
    return { error: "Tarefa não encontrada!" }
  }

  // Armazenando o novo título na tarefa 
  const update = updateTask(id, title)
  return update

}

function deleteTaskService(id) {
  // Validação
  if (!id) {
    return { error: "ID é obrigatório!" }
  }

  const taskExists = getTaskById(id)

  if (!taskExists) {
    return { error: "Tarefa não encontrada!" }
  }

  const taskDelete = deleteTask(id)
  return taskDelete
}

function setTaskStatusService(id) {
  // Validação
  if (!id) {
    return { error: "ID é obrigatório!" }
  }

  const taskExists = getTaskById(id)
  if (!taskExists) {
    return { error: "Tarefa não encontrada!" }
  }

  if (taskExists.isCompleted) {
    return { error: "Tarefa já foi concluída" }
  }

  const updateTask = setTaskStatus(id, true)
  return updateTask
}

export {
  createTaskService,
  getAllTasksService,
  updateTaskService,
  deleteTaskService,
  setTaskStatusService
}