// Ligando servidor
import express from "express"
import { router } from "./src/routes/routes.js"

const app = express()
const PORT = 3000

app.use(express.json()) // Permite a transitação de JSON
app.use(router)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
