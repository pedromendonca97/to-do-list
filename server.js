// Ligando servidor
import express from "express"
import { router } from "./src/routes/routes.js" // Arquivo com todas as rotas

const app = express() // Atribuindo express() ao app
const PORT = 3000

app.use(express.json()) // Permite a transitação de JSON
app.use(router) // Conectando as rotas com app

app.listen(PORT, () => { // Configurando porta do servidor
  console.log(`Server is running on ${PORT}`)
})
