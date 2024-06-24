import { Router } from "express";

import { novoUsuarioPost } from "../controllers/novo-usuario-controller.js";
import emailJaCadastradoMiddleware from "../middlewares/emailJaCadastradoMiddleware.js";

// Configuração da rota
const novoUsuarioRouter = Router();

// rota de cadastro do novo usuário
novoUsuarioRouter.post("/novo-usuario", emailJaCadastradoMiddleware, novoUsuarioPost);

export default novoUsuarioRouter;