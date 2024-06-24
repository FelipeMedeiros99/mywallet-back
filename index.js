import chalk from "chalk"
import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"
import { v4 as uuid } from "uuid"
import Joi from "joi"

import db from "./banco.js"

import novoUsuarioRouter from "./routes/novo-usuario-router.js"

dotenv.config();

//definição de variáveis
const PORT = process.env.PORT;

//Configuração do servidor
const app = express();
app.use(cors());
app.use(json());

// rotas
app.use(novoUsuarioRouter);


app.listen(PORT, ()=>console.log(chalk.green("servidor funcionando")));
