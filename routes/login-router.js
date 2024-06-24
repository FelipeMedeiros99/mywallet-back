import { Router } from "express"

import { senhaConfereMiddleware, usuarioExisteMiddleware } from "../middlewares/usuarioExisteMiddleware.js";

// Crianção de rotas do login
const loginRouter = Router()

loginRouter.post("/login", usuarioExisteMiddleware, senhaConfereMiddleware)

export default loginRouter