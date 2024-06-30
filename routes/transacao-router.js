import { Router } from "express"

import validacaoDeTokenMiddleware from "../middlewares/verificacaoDeToken.js"
import transacoesController from "../controllers/transacoesController.js"
import resetarTempoDeInatividadeMiddleware from "../middlewares/resetarTempoDeInatividadeMiddleware.js"

const transacaoRouter = Router()


transacaoRouter.post("/transacao", validacaoDeTokenMiddleware, resetarTempoDeInatividadeMiddleware, transacoesController)

export default transacaoRouter