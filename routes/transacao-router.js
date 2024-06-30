import { Router } from "express"

import validacaoDeTokenMiddleware from "../middlewares/verificacaoDeToken.js"
import transacoesController from "../controllers/transacoesController.js"
import resetarTempoDeInatividadeMiddleware from "../middlewares/resetarTempoDeInatividadeMiddleware.js"

const transacaoRouter = Router()

// TODO: CRIAR FUNÇÃO QUE REPITA OS MESMOS PASSOS PARA A SAÍDA

transacaoRouter.post("/transacao", validacaoDeTokenMiddleware, resetarTempoDeInatividadeMiddleware, transacoesController)

export default transacaoRouter