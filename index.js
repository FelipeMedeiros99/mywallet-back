import chalk from "chalk"
import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"

import db from "./banco.js"

dotenv.config()

//definição de variáveis
const PORT = process.env.PORT

//Configuração do servidor
const app = express()
app.use(cors())
app.use(json())




app.listen(PORT, ()=>console.log(chalk.green("servidor funcionando")))