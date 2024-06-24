import { Router } from "express"

import { usuarioExiste } from "../middlewares/usuarioExisteMiddleware.js";

// Crianção de rotas do login
const loginRouter = Router()

loginRouter.post("/login", usuarioExiste)

export default loginRouter