const taskData = [] // Array para armazenamento das tarefas criadas

function addTask(task) { // Pega a task e adiciona no array [taskData] e retorna a task
  taskData.push(task)
  return task
}

function getAllTasks() { // Retorna todas as tasks do array [taskData]
  return taskData
}

function getTaskById(id) { // Recebe id como parâmetro e busca o id correspondente
  return taskData.find(task => task.id === id) // Compara o id da task com o id recebido
}

function updateTask(id, newTitle) { // Recebe id para identificação da tarefa e o novo título para atualização 
  const task = getTaskById(id) // Reaproveitando a função de busca do id

  if (!task) { // Caso a tarefa não exista, retorn null
    return null
  }

  task.title = newTitle // Atualizando novo título

  return task // Retorna tarefa atualizada
}

function deleteTask(id) { // Recebe id correspondente a tarefa como parâmetro
  const index = taskData.findIndex(task => task.id === id) // Procura a tarefa no array com id correspondente

  if (index === -1) {
    return null
  }

  const removeTask = taskData.splice(index, 1) // splice() Remove um elemento apartir do índice
  return removeTask[0]
}

function setTaskStatus(id, isCompleted) { // Recebe o id e o status da tarefa completa { true } como parâmetro
  const task = getTaskById(id) // Reaproveitando a função de busca do id

  if (!task) { // Caso a tarefa não exista, retorn null
    return null
  }

  task.isCompleted = isCompleted // Transformando isCompleted: false > isCompleted: true
  return task // Retorna tarefa com status completed
}

export {
  addTask,
  getAllTasks,
  updateTask,
  getTaskById,
  deleteTask,
  setTaskStatus
}
