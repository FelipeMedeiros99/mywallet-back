import { Router } from "express";

import { novoUsuarioPost } from "../controllers/novo-usuario-controller.js";
import emailJaCadastradoMiddleware from "../middlewares/emailJaCadastradoMiddleware.js";


const novoUsuarioRouter = Router();

novoUsuarioRouter.post("/novo-usuario", emailJaCadastradoMiddleware, novoUsuarioPost);
export default novoUsuarioRouter;