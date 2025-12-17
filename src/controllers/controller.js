// Rota só controla. Controller executa

// Controller é quem recebe requisição e resposta (req, res)
// Extrai dados (params) (body)
// Chama regra de negócio (services)
// Retorna resposta

import {
  createTaskService,
  getAllTasksService,
  updateTaskService,
  deleteTaskService,
  setTaskStatusService
} from "../services/task_services.js" // Importando funções de validação do service

function createTaskController(req, res) {

  try {

    const { title } = req.body // Pegando o título da task
    const task = createTaskService(title) // Criando a task com o título que foi pego anteriormente
    return res.status(201).json(task)

  } catch (err) {
    return res.status(400).json({ message: err.message })
  }

}

function getAllTasksController(req, res) {
  const tasks = getAllTasksService() // Chamando função do service para listar as tarefas do array [taskData]
  return res.json(tasks) // Retorna em JSON
}

function updateTaskController(req, res) {
  const { id } = req.params // Pegando dados
  const { title } = req.body

  const result = updateTaskService(id, title)

  // Validação
  if (result.err) {
    return res.status(400).json({ message: result.err })
  }

  return res.status(200).json({ result })
}

function deleteTaskController(req, res) {
  const { id } = req.params // Pegando id

  const result = deleteTaskService(id)

  if (result.err) {
    return res.status(400).json({ message: result.err })
  }

  return res.status(200).json({ message: "Tarefa removida com sucesso" })
}

function setTaskStatusController(req, res) {
  const { id } = req.params

  const result = setTaskStatusService(id)

  if (result.err) {
    return res.status(400).json({ message: result.err })
  }

  return res.status(200).json({ result })
}

export {
  createTaskController,
  getAllTasksController,
  updateTaskController,
  deleteTaskController,
  setTaskStatusController
}
