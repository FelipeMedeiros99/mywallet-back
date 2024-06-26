import { Router } from "express";

import { senhaConfereMiddleware, usuarioExisteMiddleware } from "../middlewares/usuarioExisteMiddleware.js";
import criacaoDeToken from "../controllers/loginController.js";

// Crianção de rotas do login
const loginRouter = Router();

loginRouter.post("/login", usuarioExisteMiddleware, senhaConfereMiddleware, criacaoDeToken);

export default loginRouter;