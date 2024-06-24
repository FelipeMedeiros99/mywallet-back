import chalk from "chalk"
import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"

import novoUsuarioRouter from "./routes/novo-usuario-router.js"
import loginRouter from "./routes/login-router.js"


// TODO: VALIDAÇÕES DE LOGIN
// TODO: CRIAÇÃO DE TOKEN PARA USUÁRIO ONLINE


dotenv.config();

//definição de variáveis
const PORT = process.env.PORT;

//Configuração do servidor
const app = express();
app.use(cors());
app.use(json());

// rotas
app.use(novoUsuarioRouter);
app.use(loginRouter)


app.listen(PORT, ()=>console.log(chalk.green("servidor funcionando")));
