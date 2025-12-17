// Regra de negócio
// Service valida dados crus.
// Model recebe dados já validados.

import { v4 as uuidv4 } from "uuid" // Importando lib gerador de id
import { createTask } from "../models/task_models.js" // Importando modelo da tarefa
import {
  addTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  setTaskStatus
} from "../database/database.js" // Importando funções do database

function createTaskService(title) { // Recebe o título como parâmetro para a criação da tarefa

  // Validação
  if (typeof title !== "string" || title.trim() === "") { // typeof verifica se title é uma string. trim() garante que a string não seja vazia.
    throw new Error("Título obrigatório!") // Retorna erro caso deixar em branco
  }

  // Regras de negócio
  const id = uuidv4() // UUID gera o id aqui
  const isCompleted = false // Tarefa criada com o status padrão false

  // Model
  const task = createTask(id, title, isCompleted) // Cria tarefa com id, título e status isCompleted: false

  // Armazenando no Database
  addTask(task) // Armazena no array

  return task // Retorna tarefa criada
}

function getAllTasksService() { // Lista todas as tarefas criadas
  const tasks = getAllTasks() // Chama a função do database para retornar os itens do array [taskData]
  return tasks // Retorna as tarefas
}

function updateTaskService(id, title) { // Recebe id e título como parâmetro

  // Validando id
  if (!id) {
    return { error: "ID é obrigatório!" } // Retorna erro caso id não informado
  }

  // Validando título
  if (typeof title !== "string" || title.trim() === "") { // Validando se títlo é uma string e se está vazio
    return { error: "Título inválido!" } // Retorno de erro
  }

  // Verificando se tarefa existe
  const existingTask = getTaskById(id) // Verfica se tarefa existe pelo id
  if (!existingTask) { // Caso o id da tarefa não exista
    return { error: "Tarefa não encontrada!" } // Retorna erro
  }

  // Armazenando o novo título na tarefa 
  const update = updateTask(id, title) // Pegando id da tarefa a ser atualizada e título já validado para atualização
  return update // Retorna com a atualização

}

function deleteTaskService(id) { // Recebe o id da tarefa como parâmetro

  // Validação
  if (!id) { // Caso id não for informado
    return { error: "ID é obrigatório!" } // Retorna erro
  }

  const taskExists = getTaskById(id) // Verificando se tarefa existe por id
  if (!taskExists) { // Caso não exista
    return { error: "Tarefa não encontrada!" } // Retorna erro
  }

  const taskDelete = deleteTask(id) // Depois de tudo validado, recebe a função delete com o id da tarefa como parâmetro
  return taskDelete // Retorna tarefa deletada
}

function setTaskStatusService(id) { // Recebe id como parâmetro para a alteração de status

  // Validação
  if (!id) { // Caso id não for informado
    return { error: "ID é obrigatório!" } // Retorna erro
  }

  const taskExists = getTaskById(id) // Verificando se tarefa existe pelo id
  if (!taskExists) { // Caso não existir
    return { error: "Tarefa não encontrada!" } // Retorna erro
  }

  if (taskExists.isCompleted) { // Caso a tarefa ja estiver com status de completada
    return { error: "Tarefa já foi concluída" } // Retorna erro
  }

  const updateTask = setTaskStatus(id, true) // Recebe o id da tarefa e altera o status para isCompleted: true
  return updateTask // retorna tarefa com status isCompleted: true
}

export {
  createTaskService,
  getAllTasksService,
  updateTaskService,
  deleteTaskService,
  setTaskStatusService
}
