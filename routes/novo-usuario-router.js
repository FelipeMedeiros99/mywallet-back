import { Router } from "express"

import { novoUsuarioPost } from "../controllers/novo-usuario-controller.js"


const novoUsuarioRouter = Router()

novoUsuarioRouter.post("/novo-usuario", novoUsuarioPost)

export default novoUsuarioRouter