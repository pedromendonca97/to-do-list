// Criando modelo das tarefas

function createTask(id, title, isCompleted) {
  return {
    id,
    title,
    isCompleted,
  }
}

export {
  createTask
}
