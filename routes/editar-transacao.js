import { Router } from "express";
import validacaoDeTokenMiddleware from "../middlewares/verificacaoDeToken.js";
import restarTempoDeInatividadeMiddleware from "../middlewares/resetarTempoDeInatividadeMiddleware.js";
import editarTransacaoController from "../controllers/editar-transacao-controller.js";


const editarTransacaoRouter = Router();

editarTransacaoRouter.put("/editar", validacaoDeTokenMiddleware, restarTempoDeInatividadeMiddleware, editarTransacaoController);


export default editarTransacaoRouter;