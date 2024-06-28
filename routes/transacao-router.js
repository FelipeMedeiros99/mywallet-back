import { Router } from "express"
import validacaoDeTokenMiddleware from "../middlewares/verificacaoDeToken.js"
import entradasController from "../controllers/entradasController.js"

const transacaoRouter = Router()

// TODO: CRIAR FUNÇÃO QUE REPITA OS MESMOS PASSOS PARA A SAÍDA

transacaoRouter.post("/entrada", validacaoDeTokenMiddleware, entradasController)
transacaoRouter.post("/saida", validacaoDeTokenMiddleware)

export default transacaoRouter