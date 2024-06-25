import { Router } from "express";

import { novoUsuarioPostController } from "../controllers/novo-usuario-controller.js";
import emailJaCadastradoMiddleware from "../middlewares/emailJaCadastradoMiddleware.js";

// Configuração da rota
const novoUsuarioRouter = Router();

// rota de cadastro do novo usuário
novoUsuarioRouter.post("/novo-usuario", emailJaCadastradoMiddleware, novoUsuarioPostController);

export default novoUsuarioRouter;