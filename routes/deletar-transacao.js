import { Router } from "express";

import validacaoDeTokenMiddleware from "../middlewares/verificacaoDeToken.js";
import restarTempoDeInatividadeMiddleware from "../middlewares/resetarTempoDeInatividadeMiddleware.js";
import deletarTransacaoController from "../controllers/deletarTransacaoMiddleware.js";


const deletarTransacaoRouter = Router();

deletarTransacaoRouter.delete("/deletar", validacaoDeTokenMiddleware, restarTempoDeInatividadeMiddleware, deletarTransacaoController);

export default deletarTransacaoRouter;