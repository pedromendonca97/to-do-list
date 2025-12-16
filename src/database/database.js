const taskData = []

function addTask(task) { // Pega a task e adiciona no array [taskData] e retorna a task
  taskData.push(task)
  return task
}

function getAllTasks() { // Retorna todas as tasks do array [taskData]
  return taskData
}

function getTaskById(id) {
  return taskData.find(task => task.id === id) // .find() percorre o array e para quanado encontrar a primeira correspondência. Depois compara o id da task com o id recebido
}

function updateTask(id, newTitle) {
  const task = getTaskById(id) // Recebendo o id 

  if (!task) {
    return null
  }

  task.title = newTitle // Novo título

  return task
}

function deleteTask(id) {
  const index = taskData.findIndex(task => task.id === id) // Procurando o index no array com id correspondente

  if (index === -1) {
    return null
  }

  const removeTask = taskData.splice(index, 1) // splice() Remove um elemento apartir do índice
  return removeTask[0]
}

function setTaskStatus(id, isCompleted) {
  const task = getTaskById(id)

  if (!task) {
    return null
  }

  task.isCompleted = isCompleted
  return task
}

export {
  addTask,
  getAllTasks,
  updateTask,
  getTaskById,
  deleteTask,
  setTaskStatus
}
