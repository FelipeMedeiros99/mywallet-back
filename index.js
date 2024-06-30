import chalk from "chalk"
import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"

import novoUsuarioRouter from "./routes/novo-usuario-router.js"
import loginRouter from "./routes/login-router.js"
import controleLogout from "./utils/controleLogout.js"
import transacaoRouter from "./routes/transacao-router.js"
import deletarTransacaoRouter from "./routes/deletar-transacao.js"


dotenv.config();

//definição de variáveis
const PORT = process.env.PORT;

//Configuração do servidor
const app = express();
app.use(cors());
app.use(json());

// rotas
app.use(novoUsuarioRouter);
app.use(loginRouter);
app.use(transacaoRouter);
app.use(deletarTransacaoRouter);


// deslogando usuarios inativos a cada 1 minuto
setInterval(controleLogout, 60000);

app.listen(PORT, ()=>console.log(chalk.green("servidor funcionando")));
